import express, { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user";
const signUpRouter:Router = express.Router();
dotenv.config();

const secretKey = process.env.JWTSECRET as string;


signUpRouter.post('/api/signup', async (req: Request, res: Response) => {
    try{
        const {name, email, role} = req.body;
        // Check if Email already exists
        let user = await User.findOne({email: email});

        if(user) {
            return res.status(400).json({msg: "User already exists! Please login!"})
        }

        // If user doesnot exist
        user = new User({
            name: name,
            email: email,
            role: role
        });
        user = await user.save();  

        const token = jwt.sign({id: user._id},secretKey);
        return res.json({user: user,token:token}); // status 200 is sent by default
    }catch(e:any){
        return res.status(500).json({error: e.message});
    }
   
})

export default signUpRouter;