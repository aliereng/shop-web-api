"use strict"
const express = require("express");
const router = require("./routers/index");
const dotenv = require("dotenv");
const connetDatabase = require("./helpers/databaseHelper");
const customErrorHandler = require("./middlewares/errors/customErrorHandler");

dotenv.config({
    path:"./config/env/config.env"
});

const app = express();

app.use(express.json());
app.use("/api", router);
app.use(customErrorHandler)
connetDatabase();

app.listen(process.env.PORT, ()=>{
    console.log(`server started port on ${process.env.PORT}`)
})