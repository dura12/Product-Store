import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const createNewProduct = async (req , res) => {
    const product = req.body;
    console.log(product)
    if (!product.name || !product.price || !product.image){
        return res.status(400).send({message: "product is not valid"})  ;        
    }
    const newProduct = new Product(product)

    try{
        await newProduct.save()
        res.status(201).send({message: "new product created", product: newProduct})
    }
    catch(err){
        res.status(500).send({message: "error in creating product", error: err.message})
    }
}

export const getAllProducts = async (req , res) => {
     try {
    const products = await Product.find();
    if (!products) {
        return res.status(404).send({ message: "products not found" });
    }
    return res.status(200).send({ message: "products fetched successfully", products });
} catch (err) {
    return res.status(500).send({ message: "error in fetching products", error: err.message }); 
}}


export const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    console.log(productId)
    if (!productId) {
        return res.status(400).send({ message: "product id is not valid" });
    }
    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).send({ message: "product not found" });
        }
        return res.status(200).send({message : "product deleted successfully",
        product: deletedProduct
        })
    } catch (err) {
        return res.status(500).send({ message: "error in deleting product", error: err.message });
    }

}
export const updateProduct = async (req, res) => {
    const productId = req.params.id;
    const updatedProduct = req.body;
    console.log(productId)
    if (!productId) {
        return res.status(400).send({ message: "product id is not valid" });
    }
    try {
        const product = await Product.findByIdAndUpdate(productId, updatedProduct, { new: true });
        if (!product) {
            return res.status(404).send({ message: "product not found" });
        }
        return res.status(200).send({ message: "product updated successfully", product });
    } catch (err) {
        return res.status(500).send({ message: "error in updating product", error: err.message });
    }
}