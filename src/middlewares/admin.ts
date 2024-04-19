import { Request, Response } from "express";
import User from "../models/user";

const admin = async (req: Request, res: Response, next: () => void)=>{
    try {
        const {email} = req.body;
        const user = await User.findOne({email: email}, 'role');
       
        if(!user) {
            return res.status(401).json({msg: "User is not authorized to perform the action"})
        }

        const role = user["role"];
        if(!role || role!=='admin'){
            return res.status(401).json({msg: "User is not authorized to perform the action"})
        }
        
        next();
    }catch(e:any){
        return res.status(500).json({error: e.message});
    }
}

export default admin;