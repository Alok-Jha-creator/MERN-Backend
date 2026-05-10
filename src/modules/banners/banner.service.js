
const cloudinarySvc = require('../../../services/cloudinary.services');
const BannerModel = require('./banner.model');


class BannerService {
   async transformToBannerData(req) {
       try {
        const data = req.body;
        
        if(req.file){
            data.image = await cloudinarySvc.singlefileUpload(req.file.path, 'banner');
        }
        // data.createdBy = req.loggedInUser._id;
        return data;
       } catch (exception) {
         throw exception;        
       }
    }
    async transformToBannerUpdateData(req,oldBanner){
        try {
            const data = req.body;
            if(req.file){
                data.image = await cloudinarySvc.singlefileUpload(req.file.path, 'banner');
            } else {
                data.image = oldBanner.image;
            }
            // data.updatedBy = req.loggedInUser._id;
            return data;
           } catch (exception) {
             throw exception;        
           }
    }


   async storeBanner(data){
        try {
           // const banner = new BannerModel(data);
           // return await banner.save();
           const banner = await BannerModel.create(data);
           return banner;
        } catch (exception) {
            throw exception;
        }
     
    }
   async listAllBannersByFilter(filter){
          try {
              const data = await BannerModel.findAll({
                where: filter,
                order: [['createdAt', 'DESC']],
                // limit:limit,
                // offset:offset,
                // include:[{association:'createdBy',attributes:['_id','name','role','email','image','status']},{association:'updatedBy',attributes:['_id','name','role','email','image','status']}]
               
              })
                
                return data;
          } catch (exception) {
                throw exception;
          }
    }

    async validateBannerDetail(id){
        let filter = {
            _id: id,
        }
      
        const bannerDetail=await this.getSingleRowByFilter(filter);
        if(!bannerDetail) { throw {
            code:404,
            message:"Banner not found",
            status:"BANNER_NOT_FOUND"
        };  
    }
    return bannerDetail;
 }

   async getSingleRowByFilter(filter){
    try {
        const data = await BannerModel.findOne({
            where: filter,
            // include:[{association:'createdBy',attributes:['_id','name','role','email','image','status']},{association:'updatedBy',attributes:['_id','name','role','email','image','status']}]
        })
         
          return data;
    } catch (exception) {
          throw exception;
    }
   }

   async updateBanner(data,filter){
    try {
        const updateData = await BannerModel.update(data,{
            where: filter,
            
        })
        return updateData;
    } catch (exception) {
        throw exception;
    }
   }

   async deleteDataById(id){
    try {
        return await BannerModel.destroy(filter,{
            where: filter,
        });
    } catch (exception) {
         throw exception;
    }
   }
}

const bannerService = new BannerService();
module.exports = {bannerService}