const Admin = require("../../models/Admin");
const Customer = require("../../models/Customer");
const Supplier = require("../../models/Supplier");
const controleAndReturnModel = (model)=> {
    if(model=="admin") return Admin;
    if(model=="customer") return Customer;
    if(model=="supplier") return Supplier
}

module.exports = {
    controleAndReturnModel
}