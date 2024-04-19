import express, { Router, Request, Response } from "express";
import admin from "../../middlewares/admin";
import auth from "../../middlewares/auth";
import validateEmail from "../../middlewares/validateEmail";
import Product from "../../models/product";
const productRouter:Router = express.Router();

productRouter.post('/api/addProduct', validateEmail, auth, admin, async (req: Request, res: Response) => {
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

productRouter.get('/api/viewProducts', validateEmail, auth, admin, async (req: Request, res: Response) => {
    try{
        const products = await Product.find();
        return res.status(200).json({products: products});
        
    }catch(e:any){
        return res.status(500).json({error: e.message});
    }
   
})

export default productRouter;