import express, { Router, Request, Response } from "express";
import admin from "../../middlewares/admin";
import auth from "../../middlewares/auth";
import validateEmail from "../../middlewares/validateEmail";
const addProductRouter:Router = express.Router();

addProductRouter.post('/api/addProduct', validateEmail, auth, admin, async (req: Request, res: Response) => {
    try{
        return res.send("OK")
        
    }catch(e:any){
        return res.status(500).json({error: e.message});
    }
   
})

export default addProductRouter;