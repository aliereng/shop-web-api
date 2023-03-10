const mongoose = require("mongoose");
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
    type:{
        type:String,
        default:"other",
        enum:["other", "base"]
    },
    status: {
        type: Boolean,
        default:true
    },
    image:{
        type: String,

    }
   
})

StockModel.methods.updateProductBaseStock =  function(productId){
    const product =  Product.findById(productId);
    product.stocks[0].type = "base";
        product.size = this.size;
        product.color = this.color;
        product.price = this.price
         product.save();
}

module.exports = mongoose.model("Stock", StockModel)