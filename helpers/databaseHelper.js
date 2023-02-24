const mongoose = require("mongoose")
mongoose.set("strictQuery", false);
const connetDatabase = () => {
    mongoose.connect(process.env.URI).then(() => {
        console.log("veritabanı bağlantısı başarılı");
    }).catch(err => {
        console.log(`veritabanı bağlantı hatası:\n${err}`)
    })
}

module.exports = connetDatabase;