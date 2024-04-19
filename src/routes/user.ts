import express, { Router, Request, Response } from "express";
import auth from "../middlewares/auth";
import Product from "../models/product";
const userRouter:Router = express.Router();

userRouter.get('/api/viewAvailableProducts', auth, async (req: Request, res: Response) => {
    try{
        const products = await Product.find({instock: true});
        return res.status(200).json({products: products});
        
    }catch(e:any){
        return res.status(500).json({error: e.message});
    }
})

export default userRouter;