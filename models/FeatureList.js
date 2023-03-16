const mongoose = require("mongoose");

const FeatureListModel = new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.ObjectId
    },
    features: [
        String
    ]
})

module.exports = mongoose.model("FeatureList", FeatureListModel)