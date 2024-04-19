import express, { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user";
const authRouter:Router = express.Router();
dotenv.config();

const secretKey = process.env.JWTSECRET as string;
console.log(secretKey);


authRouter.post('/api/signup', async (req: Request, res: Response) => {
    try{
        const {name, email, role} = req.body;
        // Check if Email already exists
        let user = await User.findOne({email: email});

        if(user) {
            res.send("User already exists! Please login!")
        }

        // If user doesnot exist
        user = new User({
            name: name,
            email: email,
            role: role
        });
        user = await user.save();  
        
        const token = jwt.sign({id: user._id},secretKey);
        res.json({user: user,token:token}); // status 200 is sent by default
    }catch(e:any){
        res.status(500).json({error: e.message});
    }
   
})

export default authRouter;