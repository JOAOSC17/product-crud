const route = req("express").Router()
const ProductModel = require("./models/Product")
route.post("/create", async (req, res) => {
    const newProduct = new ProductModel(req.body)
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct)        
    } catch (err) {
        res.status(500).json(err)        
    }
})
route.get("/list", async (req, res) => {
    try {
        const products = await ProductModel.find()
        res.json(products)
    } catch (err) {
       res.status(500).json(err);
    }
})
route.get("/show/:id", async (req, res) => {
    try{
        const product = await ProductModel.findById(req.params.id);
        res.status(200).json(product);
    }catch (err){
        res.status(500).json(err);
    }
})
route.put("/update/:id", async (req, res) => {
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
route.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await ProductModel.findByIdAndRemove(id).exec();
        res.json("deleted");
    } catch (error) {
        res.status(500).json(err);
    }
})
module.exports =route