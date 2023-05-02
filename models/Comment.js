const mongoose = require("mongoose");
const Product = require("./Product");

const CommentModel = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.ObjectId,
        ref: "Customer"
    },
    commentType: String,
    commentRef: {
        type: mongoose.Schema.ObjectId,
        ref: 'commentType'
    },
    comment: {
        type: String,
        required: [true, "comment alanı boş bırakılamaz"]
    },
    totalLikeCount: {
        type:Number,
        default:0
    },
    point:String,
    createdAt:{
        type:Date,
        default:Date.now
    }
})
CommentModel.post("save", async function() {
    const product = await Product.findById(this.commentRef);
    product.comments.push(this._id);
    product.save();
})
CommentModel.post("deleteMany", async function(){
    const products = await Product.find();
    products.map(product=> {
        product.comments = [];
        product.save();
    })
})

module.exports = mongoose.model("Comment", CommentModel)