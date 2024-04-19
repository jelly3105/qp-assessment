import express, { Express } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import signUpRouter from "./routes/signup";
import loginRouter from "./routes/login";
import adminRouter from "./routes/admin";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const dbPassword = process.env.DBPASSWORD;

// Use middlewares
app.use(express.json());
app.use(cors());

app.use(signUpRouter);
app.use(loginRouter);
app.use(adminRouter);

const DB = `mongodb+srv://AnjaliSherikar:${dbPassword}@cluster0.effefqo.mongodb.net/`;

mongoose.connect(DB).then(()=>{
    console.log("MongoDB Connected Successfully");
}).catch((err)=>{
    console.log(err);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});