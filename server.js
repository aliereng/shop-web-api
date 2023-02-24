"use strict"
const express = require("express");
const router = require("./routers/index");
const dotenv = require("dotenv");
const connetDatabase = require("./helpers/databaseHelper");

dotenv.config({
    path:"./config/env/config.env"
});

const app = express();

app.use(express.json());
app.use("/api", router);

connetDatabase();
app.listen(process.env.PORT, ()=>{
    console.log(`server started port on ${process.env.PORT}`)
})