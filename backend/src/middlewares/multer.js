import multer from "multer"
import fs from 'fs'

const filePath = 'public';

try {
fs.accessSync(filePath, fs.constants.F_OK);
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, filePath)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
} catch (err) {
if (err.code === ‘ENOENT’) {
console.error(‘File does not exist’);
} else {
// Handle other errors
console.error(err);
}
}

  
 export const upload = multer({ storage })
