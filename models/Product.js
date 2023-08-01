const mongoose = require("mongoose");
const sluqify = require("slugify");
const Stock = require("./Stock");
const ProductModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "ürün ad alanı boş bırakılamaz"],
    },
    description: {
        type: String,
        required: [true, "ürün açıklama alanı boş bırakılamaz"]
    },
    slug: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    properties: [
       String
    ],
    image: {
        type: String,
        default: "default.png"
    },
    images: {
        type: [String],

    },
    size: {
        type: String,
    },
    color: {
        type: String
    },
    price: {
        type: Number,
        default: 0
    },
    supplier: {
        type: mongoose.Schema.ObjectId,
        ref: "Supplier"
    },
    categories:[
        {
            type: mongoose.Schema.ObjectId,
            ref: "Category" 
        }
    ],
    rating: Number,
    comments: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Comment"
        }
    ],
    stocks: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Stock"
        }
    ],
    visible: {
        type: Boolean,
        default: true
    }
})
ProductModel.pre("save", function (next) {

    if (!this.isModified("name")) {
        next()
    }
    this.slug = this.makeSlug();
  
    next();


});
ProductModel.pre("remove", async function () {
    
    const stocks = await  Stock.find({product:this._id});
    stocks.map(stock => {
        stock.removeOtherPictures(stock._id, stock.images)
    })
    await Stock.deleteMany({
        product: this._id
    })
})
ProductModel.post("deleteMany", async function(){
    await Stock.deleteMany({product:this._id});
})


ProductModel.methods.makeSlug = function () {
    return sluqify(this.name, {
        replacement: '-',
        remove: /[*+~.()'"!:@]/g,
        lower: true,
        strict: false,
        locale: 'vi',
        trim: true
    })
}

module.exports = mongoose.model("Product", ProductModel)