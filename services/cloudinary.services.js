const cloudinary = require('cloudinary').v2;
const {CloudinaryConfig} = require("../config/config")

class CloudinaryService{
    constructor(){
       cloudinary.config({
        cloud_name: CloudinaryConfig.cloud_name,
        api_key: CloudinaryConfig.apiKey,
        api_secret: CloudinaryConfig.apiSecret
       })
    }
    async optimizeImage(public_id,size = '1024*1024') {
      cloudinary.image("woman-blackdress-stairs.png",{transformation: [
        {gravity: "face",height:200,width:200,crop:"thumb"},
        {radius:max},
        {fetch_format:"auto"}
         ]
      })
    } 




    async fileUpload(filePath, dir = null) {
       try {
        const {public_id,secure_url} = await cloudinary.uploader.upload(filePath, {
            unique_filename: true,
            folder: dir ? "/ecom-50" + dir : '/ecom-50',
            format: "auto",
        })

       } catch (exception) {
        throw {
            code: 500,
            message: "Cloudinary upload error",
            status: "CLOUDINARY_UPLOAD_ERR",
        };
       }
        
    } 
}

const cloudinarySvc = new CloudinaryService();
module.exports = cloudinarySvc;