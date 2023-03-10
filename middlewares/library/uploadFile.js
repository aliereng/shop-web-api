const multer = require("multer");
const path = require("path");
const {v4: uuidv4} = require("uuid");
const CustomError = require("../../helpers/error/CustomError");
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        const rootDir = path.dirname(require.main.filename);
        cb(null, path.join(rootDir, "/public/uploads"));
    },
    filename: function(req, file, cb){
        const extension = file.mimetype.split("/")[1];
        req.image = "image_" + req.user.id +"_"+uuidv4()+"." +extension;
        cb(null, req.image)
    }
})
const fileFilter = (req, file, cb) =>{
    let allowedMimeTypes = ["image/jpg", "image/gif","image/jpeg", "image/png"];
    if(!allowedMimeTypes.includes(file.mimetype)){
        return cb(new CustomError("desteklenmeyen dosya formatı", 401), false);
    }
    return cb(null, true)
}

const imageUpload = multer({storage, fileFilter});
module.exports = imageUpload;