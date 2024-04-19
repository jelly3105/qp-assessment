import express, { Router, Request, Response } from "express";
import auth from "../../middlewares/auth";
const addProductRouter:Router = express.Router();

addProductRouter.post('/api/addProduct', auth, async (req: Request, res: Response) => {
    try{
        return res.send("OK")
        
    }catch(e:any){
        return res.status(500).json({error: e.message});
    }
   
})

export default addProductRouter;