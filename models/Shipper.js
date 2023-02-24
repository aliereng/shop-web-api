const mongoose = require("mongoose");

const ShipperModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "kargo firma ad alanı boş bırakılamaz"]
    },
    email: {
        type: String,
        required: [true, "kargo firma email alanı boş bırakılamaz"],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "uygun olmayan mail format"]
    },
    phone: {
        type: String,
        required: [true, "kargo firma telefon alanı boş bırakılamaz"]
    },
})

module.exports = mongoose.model("Shipper", ShipperModel)