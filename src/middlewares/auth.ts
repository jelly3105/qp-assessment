import { Request, Response } from "express";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
dotenv.config();

const secretKey = process.env.JWTSECRET as string;
const auth = async (req: Request, res: Response, next: () => void)=>{
    try {
        const token = req.header("Authorization")?.split(" ")[1];
        if(!token)
            return res.status(401).json({msg: 'No auth token, access denied.'});
        const verified = jwt.verify(token,"passwordKey");
        if(!verified)
            return res.status(401).json({msg: 'Token verificationn failed, authorization denied'});
        next();
    }catch(e:any){
        return res.status(500).json({error: e.message});
    }
}

export default auth;