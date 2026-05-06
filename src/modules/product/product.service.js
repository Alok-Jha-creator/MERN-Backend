const slugify = require('slugify');
const cloudinarySvc = require('../../../services/cloudinary.services');
const ProductModel = require('./product.model');
const { userRoles } = require('../../config/constants');

class ProductService {
   async transformToProductData(req) {
       try {
        const data = req.body;
        let slugParams = data.name + '-' + Date.now();   // to make unique slug eg: iphone-15-1686789012345
        data.slug = slugify(slugParams,{
         lower:true,
        })

        // forign key --> data from diffent model
        if(!data.category || data.parent === '' || data.category === 'null') {
            data.category = null;
        }
        if(!data.brand || data.brands === '' || data.brand === 'null') {
            data.brand = null;
        }
        if(!data.seller || data.brands === '' || data.seller === 'null') {
            data.seller = req.loggedInUser._id;
        }

        //price
        data.price= data.price * 100; // 1 rs = 100 paisa
        // after discount price
        data.afterDiscount = data.price - (data.price * data.discount / 100);

        if(req.files){
            data.images = await cloudinarySvc.uploadMultipleFiles(req.file, 'product');
        }
       
        data.createdBy = req.loggedInUser._id;
        return data;
       } catch (exception) {
         throw exception;        
       }
    }




    async transformToProductUpdateData(req,oldProduct){
        try {
            const data = req.body;
            if(req.file){
                data.image = await cloudinarySvc.singlefileUpload(req.file.path, 'product');
            } else {
                data.image = oldProduct.image;
            }
            if(!data.parent || data.parent === '' || data.parent === 'null') {
                data.parent = null;
            }
            if(!data.brands || data.brands === '' || data.brands === 'null') {
                data.brands = null;
            }
            data.updatedBy = req.loggedInUser._id;
            return data;
           } catch (exception) {
             throw exception;        
           }
    }


   async storeProduct(data){
        try {
            let product = new ProductModel(data);
            product = await product.save();
            return await this.getSingleRowByFilter({_id:product._id});
        } catch (exception) {
            throw exception;
        }
     
    }
   async listAllProductsByFilter(filter){
          try {
              const data = await ProductModel.find(filter)
                 .populate('parent',['_id','name','slug','image','status','parent','brands'])
                 .populate('brands',['_id','name','slug','image','status'])
                 .populate('createdBy',['_id','name','role','email','image','status'])
                 .populate('updatedBy',['_id','name','role','email','image','status'])
                return data;
          } catch (exception) {
                throw exception;
          }
    }

    async validateProductDetail(id,loggedInUser){
        let filter = {
            _id: id,
        }
        if (loggedInUser.role !== userRoles.ADMIN) {
            filter={
                ...filter,
                createdBy: loggedInUser._id
            }
        }
        const productDetail=await this.getSingleRowByFilter(filter);
        if(!productDetail) { throw {
            code:404,
            message:"Product not found",
            status:"BRAND_NOT_FOUND"
        };  
    }
    return productDetail;
 }

   async getSingleRowByFilter(filter){
    try {
        const data = await ProductModel.findOne(filter)
           .populate('createdBy',['_id','name','role','email','image','status'])
           .populate('updatedBy',['_id','name','role','email','image','status'])
          return data;
    } catch (exception) {
          throw exception;
    }
   }

   async updateProduct(data,filter){
    try {
        const updateData = await ProductModel.findOneAndUpdate(filter,{$set:data},{new:true})
        return updateData;

    } catch (exception) {
        throw exception;
    }
   }

   async deleteDataById(id){
    try {
        return await ProductModel.findByIdAndDelete(id);
    } catch (exception) {
         throw exception;
    }
   }
}

const productService = new ProductService();
module.exports = {productService}