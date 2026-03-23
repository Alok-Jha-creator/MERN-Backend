const multer = require('multer');
const uploader = () =>{
    const myStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            const path = "./public/uploads/"
        },
        filename: (req, file, cb) => {cb(null, Date.now() + '-' + file.originalname) }
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