const mongoose = require("mongoose");
const sluqify = require("slugify")
const CategoryModel = new mongoose.Schema({
   
    parentId: {
        type: String,
        default: null
    },
    name: {
        type:String
    },
    children: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Category"
        }
    ],
    properties:[
        {
            type: mongoose.Schema.ObjectId,
            ref:"PropertyOfCategory"
        }
    ],
    
    slug:String
})

CategoryModel.pre("save", function (next) {

    if (!this.isModified("name")) {
        next()
    }
    // let newName ="";
    // const categoryName = this.name.toLowerCase().split(" ");
    // categoryName.map((item) => {
    //     newName += `${item[0].toLocaleUpperCase("TR")+ item.slice(1)} `;
        
    // })
    // this.name = newName.trim();
    this.slug = this.makeSlug();
    next();

});
CategoryModel.methods.makeSlug = function () {
    return sluqify(this.name, {
        replacement: '-',  
        remove: /[*+~.()'"!:@]/g, 
        lower: true,     
        strict: false,    
        locale: 'vi',      
        trim: true    
    })
}

module.exports = mongoose.model("Category", CategoryModel)