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

        if(req.files && req.files.length > 0){
            data.images = await cloudinarySvc.uploadMultipleFiles(req.files, 'product');
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

            if(req.files && req.files.length > 0){
                data.images = await cloudinarySvc.uploadMultipleFiles(req.files, 'product');
            } else {
                data.images = oldProduct.images;
            }
            if(!data.category || data.category === '' || data.category === 'null') {
                data.category = null;
            }
            if(!data.brand || data.brand === '' || data.brand === 'null') {
                data.brand = null;
            }
              //price
              data.price= data.price * 100; // 1 rs = 100 paisa
              // after discount price
              data.afterDiscount = data.price - (data.price * data.discount / 100);
            data.images= oldProduct.images;
            if(req.files && req.files.length > 0){
                data.images = await cloudinarySvc.uploadMultipleFiles(req.files, 'product');
                data.images = data.images.concat(oldProduct.images);
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
   async listAllProductsByFilter(filter,query){
          try {
              const page = +query.page || 1;
              const limit = +query.limit || 15;
              const skip = (page - 1) * limit;
              const data = await ProductModel.find(filter)
                 .populate('category',['_id','name','slug','image','status','parent','brands'])
                 .populate('brand',['_id','name','slug','image','status'])
                 .populate('createdBy',['_id','name','role','email','image','status'])
                 .populate('seller',['_id','name','role','email','image','status'])
                 .populate('updatedBy',['_id','name','role','email','image','status'])
                 .sort({createdAt:'desc'})
                 .skip(skip)
                 .limit(limit);
                const count = await ProductModel.countDocuments(filter);

                return {data,pagination:{
                    total: count,
                    page: page,
                    limit: limit,
                    totalPages: Math.ceil(count/limit)
                }};
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