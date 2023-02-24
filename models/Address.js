const mongoose = require("mongoose");

const AddressModel = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: ["Customer", "Supplier"]
    },
    address: {
        city: String,
        district: String,
        neighbourhood: String,
        street: String,
        postalCode: String,
        addressDesc: String
    }

})

module.exports = mongoose.model("Address", AddressModel)