const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();
const ProductModel = require("./models/Product")
app.use(express.json());
app.use(cors())
mongoose.connect("mongodb+srv://joao:duque123@cluster0.e5pds.mongodb.net/product?retryWrites=true&w=majority",{
    useNewUrlParser:true,
});
require("dotenv").config()

app.post("/create", async (req, res) => {
    const newProduct = new ProductModel(req.body)
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct)        
    } catch (err) {
        res.status(500).json(err)        
    }
})
app.get("/list", async (req, res) => {
    try {
        const products = await ProductModel.find()
        res.json(products)
    } catch (err) {
       res.status(500).json(err);
    }
})
app.get("/show/:id", async (req, res) => {
    try{
        const product = await ProductModel.findById(req.params.id);
        res.status(200).json(product);
    }catch (err){
        res.status(500).json(err);
    }
})
app.put("/update/:id", async (req, res) => {
    try{
        const updateProduct = await ProductModel.findByIdAndUpdate(
            req.params.id,
            {
                $set:req.body,
            },
            { new:true }
        )
        res.json(updateProduct)
    }catch(err){
        console.log(err)
    }
})
app.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await ProductModel.findByIdAndRemove(id).exec();
        res.json("deleted");
    } catch (error) {
        res.status(500).json(err);
    }
})

app.listen(process.env.PORT,()=>{
    console.log("Server is running on port 3001...");
})