const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();
const productRoute = require('./routes')
app.use(express.json());
app.use(cors())
mongoose.connect("mongodb+srv://joao:duque123@cluster0.e5pds.mongodb.net/product?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
require("dotenv").config()

const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);

app.use("/api/products", productRoute)
app.listen(process.env.PORT,()=>{
    console.log("Server is running on port 3001...");
})