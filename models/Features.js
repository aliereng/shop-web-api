const mongoose = require("mongoose");

const FeatureModule = new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.ObjectId
    },
    props: [Set]
})

module.exports = mongoose.model("Feature", FeatureModule)