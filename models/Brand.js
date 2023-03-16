const mongoose = require("mongoose");
const sluqify = require("slugify");
const BrandModel = new mongoose.Schema({
    name: {
        type: String,
        require: [true,"marka ad alanı boş bırakılamaz"],
        unique: true

    },
    slug:String
})

BrandModel.pre("save", function (next) {

    if (!this.isModified("name")) {
        next()
    }
    let newName ="";
    const categoryName = this.name.toLowerCase().split(" ");
    categoryName.map((item) => {
        newName += `${item[0].toLocaleUpperCase("TR")+ item.slice(1)} `;
        
    })
    this.name = newName.trim();
    this.slug = this.makeSlug();
    next();

});
BrandModel.methods.makeSlug = function () {
    return sluqify(this.name, {
        replacement: '-',  
        remove: /[*+~.()'"!:@]/g, 
        lower: true,     
        strict: false,    
        locale: 'vi',      
        trim: true    
    })
}
module.exports = mongoose.model("Brand" ,BrandModel)