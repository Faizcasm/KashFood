import multer from "multer"
const storage = multer.diskStorage({
    const filepath = './public',
    destination: function (req, file, cb) {
      cb(null, filepath)
    if(!filepath){
        console.log("folder doesnot exists")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
 export const upload = multer({ storage })
