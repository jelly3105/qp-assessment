import express, { Router, Request, Response } from "express";
import auth from "../middlewares/auth";
import Product from "../models/product";
import User from "../models/user";
import Cart from "../models/cart";
const userRouter:Router = express.Router();

userRouter.get('/api/viewAvailableProducts', auth, async (req: Request, res: Response) => {
    try{
        const products = await Product.find({instock: true});
        return res.status(200).json({products: products});
        
    }catch(e:any){
        return res.status(500).json({error: e.message});
    }
})

userRouter.post('/api/addToCart', auth, async (req: Request, res: Response) => {
    try{
        const {email, items} = req.body;
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(401).json({msg: "User is not authorized!"});
        }
        const cartId = user['cartId'];
        if(!cartId){
            // Create new cart 
            let cart = new Cart({
                userId: user["_id"],
                items: items
            });
            cart = await cart.save();  
            await User.updateOne({ _id: user["_id"] }, { $set: {cartId: cart["_id"]} });
        }else{
            // Update existing cart
            await Cart.updateOne({ _id: cartId }, { $set: {items: items} })
        }
        
        return res.status(200).json({msg: "Products added to cart!"});
        
    }catch(e:any){
        return res.status(500).json({error: e.message});
    }
})

export default userRouter;