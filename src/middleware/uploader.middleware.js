const multer = require('multer');
const fs = require('fs');
const randomStringGenerator = require('../utilities/helpers');
const uploader = (type='image') =>{
    const myStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            const path = "./public/uploads/" // if yo path exist gardaina vane folder crete gardinxa tala ko if le 
            if (!fs.existsSync(path)){
                fs.mkdirSync(path, { recursive: true });
            }
            cb(null, path)
        },
        filename: (req, file, cb) => {
            const filename = randomStringGenerator(10)+"-"+file.originalname
            cb(null, filename)
         }
      })
    let allowedTypes = ['jpg', 'jpeg', 'png', 'gif','svg', 'webp','bmp']
    let limits = 1024 * 1024 * 3  // 3MB
    if(type === 'audio'){
        allowedTypes = ['mp3', 'wav', 'ogg', 'aac', 'flac']
        limits = 1024 * 1024 * 5 // 5MB
    }else if(type === 'doc'){
        allowedTypes = ['pdf', 'doc', 'docx','json', 'ppt', 'pptx','txt', 'csv']
        limits = 1024 * 1024 * 5 // 5MB
    }else if(type === 'video'){
        allowedTypes = ['mp4', 'avi', 'mkv', 'mov', 'wmv']
        limits = 1024 * 1024 * 10 // 10MB
    }

    const vlidateFileType = (req,file,cb) => {
        const ext = file.originalname.split('.').pop();
        if(allowedTypes.includes(ext.toLowerCase())){    // .JPG --> .jpg
            cb(null, true)
        }else{
         cb({  
            code: 422,
            message:"File type not supported",
            status:"VALIDATION_FILE_ERROR"
         })
        }
    };

return multer ({
    storage: myStorage,
    fileFilter:vlidateFileType,
    limits: {
      fileSize: 1024 * 1024 * 5
    }   
})
}
module.exports = uploader;