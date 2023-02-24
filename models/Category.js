const mongoose = require("mongoose");
const sluqify = require("slugify")
const CategoryModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "kategori ad alanı boş bırakılamaz"]
    },
    subCategories: [
        {
            name:{
                type: String
            }
        }
    ],
    slug: String
})

CategoryModel.pre("save", function (next) {

    if (!this.isModified("name")) {
        next()
    }
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