import express, { Router, Request, Response } from "express";
import admin from "../middlewares/admin";
import auth from "../middlewares/auth";
import validateEmail from "../middlewares/validateEmail";
import Product from "../models/product";
const adminRouter:Router = express.Router();

adminRouter.post('/api/addProduct', validateEmail, auth, admin, async (req: Request, res: Response) => {
    try{
        const {name, category, instock, price} = req.body;
        let product = await Product.findOne({name:name});

        if(product) {
            return res.status(400).json({msg: 'product is already present'});
        }

        product = new Product({
            name: name,
            category: category,
            instock: instock,
            price: price
        });
        product = await product.save(); 
        return res.status(200).json({msg: "Product saved successfully!"});
        
    }catch(e:any){
        return res.status(500).json({error: e.message});
    }
})

adminRouter.get('/api/viewProducts', validateEmail, auth, admin, async (req: Request, res: Response) => {
    try{
        const products = await Product.find();
        return res.status(200).json({products: products});
        
    }catch(e:any){
        return res.status(500).json({error: e.message});
    }
})

adminRouter.post('/api/removeProduct', validateEmail, auth, admin, async (req: Request, res: Response) => {
    try{
        const {productId} = req.body;
        let product = await Product.findOne({_id:productId});

        if(!product) {
            return res.status(400).json({msg: 'product is not present'});
        }

        await Product.deleteOne({_id: productId});
        return res.status(200).json({msg: "Product deleted successfully"});
        
    }catch(e:any){
        return res.status(500).json({error: e.message});
    }
})

adminRouter.post('/api/updateProduct', validateEmail, auth, admin, async (req: Request, res: Response) => {
    try{
        const {productId, updateData} = req.body;
        let product = await Product.findOne({_id:productId});

        if(!product) {
            return res.status(400).json({msg: 'product is not present'});
        }

        await Product.updateOne({ _id: productId }, { $set: updateData });
        return res.status(200).json({msg: "Product updated successfully"});
        
    }catch(e:any){
        return res.status(500).json({error: e.message});
    }
})

export default adminRouter;