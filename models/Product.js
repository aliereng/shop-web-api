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
    properties: {
        type: [String]
    },
    image: {
        type: String,
        default: "default.png"
    },
    images: {
        type: [String],

    },
    supplier: {
        type: mongoose.Schema.ObjectId,
        ref: "Supplier"
    },
    category:
    {
        type: mongoose.Schema.ObjectId,
        ref: "Category"
    }
    ,
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
    show: {
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
    await Stock.deleteOne({
        product: this._id
    })
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