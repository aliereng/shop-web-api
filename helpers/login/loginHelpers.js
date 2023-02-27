const bcrypt = require("bcryptjs");

function validateInputs(email, password) {
    return email && password
}

function comparePassword(password, hashedPass){
    return bcrypt.compareSync(password, hashedPass)
}

module.exports = {
    validateInputs,
    comparePassword
}