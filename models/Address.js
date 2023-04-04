const mongoose = require("mongoose");

const AddressModel = new mongoose.Schema({
    userType: String,
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'userType'
    },
    title: {
        type:String,
        required: [true, "customer adres title boş bırakılamaz."]
    },
    selected:Boolean,
    
    info: {
        name: String,
        surname: String,
        phone: String,
        city: String,
        district: String,
        neighbourhood: String,
        street: String,
        postalCode: String,
        addressDesc: String
    }

})

module.exports = mongoose.model("Address", AddressModel)