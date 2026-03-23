const multer = require('multer');
const fs = require('fs');
const randomStringGenerator = require('../utilities/helpers');
const uploader = () =>{
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

  return multer ({
    storage:"",
    fileFilter: ()=> {},
    limits: {
      fileSize: 1024 * 1024 * 5
    }   
})
}
module.exports = uploader;