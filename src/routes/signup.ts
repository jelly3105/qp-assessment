import express, { Router, Request, Response } from "express";
const authRouter:Router = express.Router();

authRouter.post('/api/signup', async (req: Request, res: Response) => {
    try{
        const {name, email, role} = req.body;
        res.send("Sign up API")
    }catch(e){
        res.status(500).send(e);
    }
   
})

export default authRouter;