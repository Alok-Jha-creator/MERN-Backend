const slugify = require('slugify');
const cloudinarySvc = require('../../../services/cloudinary.services');
const BrandModel = require('./brand.model');
const { userRoles } = require('../../config/constants');

class BrandService {
   async transformToBrandData(req) {
       try {
        const data = req.body;
        data.slug = slugify(data.name,{
         lower:true,
        })
        if(req.file){
            data.logo = await cloudinarySvc.singlefileUpload(req.file.path, 'brand');
        }
        data.createdBy = req.LoggedInUser._id;
        return data;
       } catch (exception) {
         throw exception;        
       }
    }
    async transformToBrandUpdateData(req,oldBrand){
        try {
            const data = req.body;
            if(req.file){
                data.logo = await cloudinarySvc.singlefileUpload(req.file.path, 'brand');
            } else {
                data.logo = oldBrand.logo;
            }
            data.updatedBy = req.LoggedInUser._id;
            return data;
           } catch (exception) {
             throw exception;        
           }
    }


   async storeBrand(data){
        try {
            const brand = new BrandModel(data);
            return await brand.save();
        } catch (exception) {
            throw exception;
        }
     
    }
   async listAllBrandsByFilter(filter){
          try {
              const data = await BrandModel.find(filter)
                 .populate('createdBy',['_id','name','role','email','image','status'])
                 .populate('updatedBy',['_id','name','role','email','image','status'])
                return data;
          } catch (exception) {
                throw exception;
          }
    }

    async validateBrandDetail(id,loggedInUser){
        let filter = {
            _id: id,
        }
        if (loggedInUser.role !== userRoles.ADMIN) {
            filter={
                ...filter,
                createdBy: loggedInUser._id
            }
        }
        const brandDetail=await this.getSingleRowByFilter(filter);
        if(!brandDetail) { throw {
            code:404,
            message:"Brand not found",
            status:"BRAND_NOT_FOUND"
        };  
    }
    return brandDetail;
 }

   async getSingleRowByFilter(filter){
    try {
        const data = await BrandModel.findOne(filter)
           .populate('createdBy',['_id','name','role','email','image','status'])
           .populate('updatedBy',['_id','name','role','email','image','status'])
          return data;
    } catch (exception) {
          throw exception;
    }
   }

   async updateBrand(data,filter){
    try {
        const updateData = await BrandModel.findOneAndUpdate(filter,{$set:data},{new:true})
        return updateData;
    } catch (exception) {
        throw exception;
    }
   }
}

const brandService = new BrandService();
module.exports = {brandService}