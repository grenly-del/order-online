import multer from 'multer'

const store = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/products')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})


export const upload = multer({
    storage: store,
    limits: {
        fileSize: 4000000 
    },
    fileFilter: (req, file, cb) => {
        if(!file.mimetype.includes("image")) {
            return cb(null, false)
        }else {
            return cb(null, true)
        }
    }
})