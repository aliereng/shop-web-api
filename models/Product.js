const mongoose = require("mongoose");
const sluqify = require("slugify")
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
    properties: [],
    image: {
        type: String,
        default: "default.png"
    },
    images: [],
    supplier: {
        type: mongoose.Schema.ObjectId,
        ref: "Supplier"
    },
    stocks:[
        {
            type: mongoose.Schema.ObjectId,
            ref:"Stock"
        }
    ],
    category: [
        {
            type: mongoose.Schema.ObjectId,
            ref:  "Category"
        }
    ],
    rating: Number,
    comments: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Comment"
        }
    ]
})
ProductModel.pre("save", function (next) {

    if (!this.isModified("name")) {
        next()
    }
    this.slug = this.makeSlug();
    next();

});
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