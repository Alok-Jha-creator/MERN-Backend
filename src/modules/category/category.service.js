const slugify = require('slugify');
const cloudinarySvc = require('../../../services/cloudinary.services');
const CategoryModel = require('./category.model');
const { userRoles } = require('../../config/constants');

class CategoryService {
   async transformToCategoryData(req) {
       try {
        const data = req.body;
        data.slug = slugify(data.name,{
         lower:true,
        })
        if(req.file){
            data.image = await cloudinarySvc.singlefileUpload(req.file.path, 'category');
        }
        if(!data.parent || data.parent === '' || data.parent === 'null') {
            data.parent = null;
        }
        if(!data.brands || data.brands === '' || data.brands === 'null') {
            data.brands = null;
        }
        data.createdBy = req.loggedInUser._id;
        return data;
       } catch (exception) {
         throw exception;        
       }
    }
    async transformToCategoryUpdateData(req,oldCategory){
        try {
            const data = req.body;
            if(req.file){
                data.image = await cloudinarySvc.singlefileUpload(req.file.path, 'category');
            } else {
                data.image = oldCategory.image;
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


   async storeCategory(data){
        try {
            let category = new CategoryModel(data);
            category = await category.save();
            return await this.getSingleRowByFilter({_id:category._id});
        } catch (exception) {
            throw exception;
        }
     
    }
   async listAllCategoriesByFilter(filter){
          try {
              const data = await CategoryModel.find(filter)
                 .populate('parent',['_id','name','slug','image','status','parent','brands'])
                 .populate('brands',['_id','name','slug','image','status'])
                 .populate('createdBy',['_id','name','role','email','image','status'])
                 .populate('updatedBy',['_id','name','role','email','image','status'])
                return data;
          } catch (exception) {
                throw exception;
          }
    }

    async validateCategoryDetail(id,loggedInUser){
        let filter = {
            _id: id,
        }
        if (loggedInUser.role !== userRoles.ADMIN) {
            filter={
                ...filter,
                createdBy: loggedInUser._id
            }
        }
        const categoryDetail=await this.getSingleRowByFilter(filter);
        if(!categoryDetail) { throw {
            code:404,
            message:"Category not found",
            status:"BRAND_NOT_FOUND"
        };  
    }
    return categoryDetail;
 }

   async getSingleRowByFilter(filter){
    try {
        const data = await CategoryModel.findOne(filter)
           .populate('createdBy',['_id','name','role','email','image','status'])
           .populate('updatedBy',['_id','name','role','email','image','status'])
          return data;
    } catch (exception) {
          throw exception;
    }
   }

   async updateCategory(data,filter){
    try {
        const updateData = await CategoryModel.findOneAndUpdate(filter,{$set:data},{new:true})
        return updateData;

    } catch (exception) {
        throw exception;
    }
   }

   async deleteDataById(id){
    try {
        return await CategoryModel.findByIdAndDelete(id);
    } catch (exception) {
         throw exception;
    }
   }
}

const categoryService = new CategoryService();
module.exports = {categoryService}