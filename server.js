"use strict"
const express = require("express");
const router = require("./routers/index");
const dotenv = require("dotenv");
const connetDatabase = require("./helpers/databaseHelper");
const customErrorHandler = require("./middlewares/errors/customErrorHandler");
const path = require("path");
dotenv.config({
    path:"./config/env/config.env"
});

const app = express();
app.use(express.static(path.join(__dirname, "public")))
app.use(express.json());
app.use("/api", router);
app.use(customErrorHandler)
connetDatabase();

app.listen(process.env.PORT, ()=>{
    console.log(`server started port on ${process.env.PORT}`)
})