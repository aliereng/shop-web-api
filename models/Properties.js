const mongoose = require("mongoose");
const Category = require("../models/Category")
const PropertyModule = new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.ObjectId
    },
    property: String,
    results: [String]
})

PropertyModule.post("save", async function(){
    const category = await Category.findById(this.categoryId);
    category.properties.push(this._id);
    category.save();
})
module.exports = mongoose.model("PropertyOfCategory", PropertyModule)