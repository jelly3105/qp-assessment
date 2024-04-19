import { Request, Response } from "express";
import User from "../models/user";

const validateEmail = async (req: Request, res: Response, next: () => void)=>{
    try {
        const {email} = req.body;
        const user = await User.findOne({email: email});
       
        if(!user) {
            return res.status(401).json({msg: "Please Sign up!"})
        }
        
        next();
    }catch(e:any){
        return res.status(500).json({error: e.message});
    }
}

export default validateEmail;