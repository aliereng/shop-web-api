const mongoose = require("mongoose");
const Product = require("./Product");
const Supplier = require("./Supplier");

const CommentModel = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.ObjectId,
        ref: "Customer"
    },
    product:{
        type:mongoose.Schema.ObjectId,
        ref:"Product",
    },
    stock:{
        type:mongoose.Schema.ObjectId,
        ref:"Stock"
    },
    supplier:{
        type:mongoose.Schema.ObjectId,
        ref:"Supplier",
    },
    comment: {
        type: String,
        required: [true, "comment alanı boş bırakılamaz"]
    },
    totalLikeCount: {
        type:Number,
        default:0
    },
    score:String,
    createdAt:{
        type:Date,
        default:Date.now
    }
})
CommentModel.post("save", async function() {
    if(this.product != null){
        const product = await Product.findById(this.product);
        product.comments.push(this._id);
        product.save();
    }else{
        const supplier = await Supplier.findById(this.supplier);
        supplier.comments.push(this._id);
        supplier.save();
    }
    
    
})
CommentModel.post("deleteMany", async function(){
    const products = await Product.find();
    const suppliers = await Supplier.find();
    products.map(product=> {
        product.comments = [];
        product.save();
    })
    suppliers.map(supplier=> {
        supplier.comments = [];
        supplier.save();
    })
})
CommentModel.pre("deleteOne", async function(){
    if(this.product){
        const product = await Product.findById(this.product)
        product.comments.map((comment,index)=> {
            if(comment == this._id){
                product.comments.slice(index,1);
                product.save()
            }
        })
    }else{
        const supplier = await Supplier.findById(this.supplier)
        supplier.comments.map((comment,index)=> {
            if(comment == this._id){
                supplier.comments.slice(index,1);
                supplier.save()
            }
        })
    }
})

module.exports = mongoose.model("Comment", CommentModel)