const mongoose = require("mongoose");
const fs = require("fs")
const Product = require("./Product");

const StockModel = new mongoose.Schema({
    product: {
        type: mongoose.Schema.ObjectId,
        ref:"Product"
    },
    size: {
        type: String
    },
    color: {
        type: String
    },
    piece: {
        type:Number, 
        default: 0
    },
    price: {
        type: Number,
        default:0
    },
    base:{
        type:Boolean,
        default:false
    },
    status: {
        type: Boolean,
        default:true
    },
    image:{
        type: String,

    },
    images: {
        type:[String]
    }   
})

StockModel.methods.updateProductBaseStock =  function(productId){
    const product =  Product.findById(productId);
    product.stocks[0].base = true;
        product.size = this.size;
        product.color = this.color;
        product.price = this.price
        product.save();
}
StockModel.methods.removeOtherPictures = function(stockId, picNames){
    fs.readdir(process.cwd()+"/public/uploads", (err, files)=> {
        if(err){
            console.log(`${process.cwd()}/public/uploads yolu bulunamadı: ${err}`)
        }else{
            if(Array.isArray(picNames)){
                picNames.map(picName => {
                    if(files.includes(picName)){
                        fs.unlink(process.cwd()+`/public/uploads/${picName}`, function(err){
                            if(err) console.log("dosya silme işlemi sırasında hatalarla karşılaşıldı: "+ err)
                        })
                    }
                })
            }
        }
    })
}

module.exports = mongoose.model("Stock", StockModel)