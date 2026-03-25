const cloudinary = require('cloudinary').v2;
const {CloudinaryConfig} = require("../config/config");
const { fileDelete } = require('../src/utilities/helpers');

class CloudinaryService{
    constructor(){
       cloudinary.config({
        cloud_name: CloudinaryConfig.cloud_name,
        api_key: CloudinaryConfig.apiKey,
        api_secret: CloudinaryConfig.apiSecret
       })
    }
    optimizeImage(public_id,size = '1024*1024') {
        let [width, height] = size.split("*")
        return cloudinary.url(public_id,{
        transformation: [
        {aspect_ratio:'1.0',height:height,width:width,crop:"thumb"},
        {radius:max},
        {fetch_format:"auto"}
         ]
      })
    } 


    
   async uploadMultipleFiles(files, dir = null, size = '1024*1024') {
        try {
            if (!files && files.length) {
                let uploadFiles =[];
               files.map((file)=> {
                uploadFiles.push(this.singlefileUpload(file.path, dir, size))
               })
            const settelment = await Promise.allSettled(uploadFiles);
            let returnFiles = [];
            settelment.forEach((uploadFiles)=>{
                if(uploadFiles.status === "fulfilled"){
                    return Files.push(uploadFiles.value);
                }      
            })
            return returnFiles;
            }else {
                return false;
            }

            
        } catch (exception) {
            throw {
                code: 500,
                message: "Cloudinary upload error",
                status: "CLOUDINARY_UPLOAD_ERR",
            }
            
        }
   }


    async singlefileUpload(filePath, dir = null, size = '1024*1024') {
       try {
        const {public_id,secure_url} = await cloudinary.uploader.upload(filePath, {
            unique_filename: true,
            folder: dir ? "/ecom-50" + dir : '/ecom-50',
            format: "auto",
        })

    // optimize    
    const thumUrl = await this.optimizeImage(public_id,size);
    // delete temp file
    fileDelete(filePath);
    return {
        public_id: public_id,
        secure_url: secure_url,
        thumUrl: thumUrl
    }
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