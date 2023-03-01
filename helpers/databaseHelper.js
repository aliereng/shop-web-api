const mongoose = require("mongoose")
mongoose.set("strictQuery", false);
const connetDatabase = () => {
    mongoose.connect(process.env.URI).then(() => {
        console.log("database connection successful");
    }).catch(err => {
        console.log(`database connection error:\n${err}`)
    })
}

module.exports = connetDatabase;