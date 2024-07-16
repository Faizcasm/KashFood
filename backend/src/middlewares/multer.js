// import multer from "multer"
// import path from 'path'
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './public')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname)
//     }
//   })
  
//  export const upload = multer({ storage })

import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

 const __filename = fileURLToPath(import.meta.url);
 const __dirname = dirname(__filename);
// Define the path for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Use an absolute path to avoid issues in different environments
        cb(null, path.join(__dirname, '../public'));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

export const upload = multer({ storage });
