const slugify = require('slugify');
const cloudinarySvc = require('../../../services/cloudinary.services');
const BrandModel = require('./brand.model');

class BrandService {
   async transformToBrandData(req) {
       try {
        const data = req.body;
        data.slug = slugify(data.name)
        if(req.file){
            data.logo = await cloudinarySvc.singlefileUpload(req.file.path, 'brand');
        }
        data.createdBy = req.loggedInUser._id;
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
}

const brandService = new BrandService();
module.exports = {brandService}