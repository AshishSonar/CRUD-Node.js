const multer = require('multer')

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/')
//     },
//     filename: (req, file, cb) =>{
//         const suffix = Date.now()
//         cb(null, suffix+'-'+file.originalname)
//     }
// })

// configure multer to store files in memory as Buffer

const storage = multer.memoryStorage()

const upload = multer({storage})


module.exports = upload