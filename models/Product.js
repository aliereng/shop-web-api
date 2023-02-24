const mongoose = require("mongoose");

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


module.exports = mongoose.model("Product", ProductModel)