const mongoose = require("mongoose");

const ShipperModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "kargo firma ad alanı boş bırakılamaz"],
        unique: [true, "ilgi adla kayıt bulunmaktadır"]
    }
})

module.exports = mongoose.model("Shipper", ShipperModel)