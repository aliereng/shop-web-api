const mongoose = require("mongoose");

const AddressModel = new mongoose.Schema({
    userType: String,
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'userType'
    },
    addressTitle: {
        type:String,
        required: [true, "customer adres title boş bırakılamaz."]
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