import { Router, Request, Response } from "express";
import {z} from "zod";
import bcrypt from "bcrypt";
import { userModel } from "../db";

const userRouter=Router();

const signupHandler= async(req: Request, res: Response): Promise<any> => {
    const requireBody = z.object({
        email: z.string().min(5).max(30).email(),
        firstName: z.string().min(2).max(50),
        lastName: z.string().min(2).max(100),
        userName: z.string().min(2).max(30),
        password: z.string().min(8).max(50).regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
    })
    const parsedDataWithSuccess = requireBody.safeParse(req.body);
    if (!parsedDataWithSuccess.success) {
        return res.status(400).json({
            error: parsedDataWithSuccess.error,
            message: "Invalid Data Provided"
        })
        
    }
    try {
        const {email,firstName,lastName,userName,password}=parsedDataWithSuccess.data;
        const hashedPassword= await bcrypt.hash(password,5);

        await userModel.create({
            email,
            firstName,
            lastName,
            userName,
            password: hashedPassword
        });

        return res.json({
            message:"User Created Successfully"
        })
    }
    catch(e:any){
        console.error(e); // Log the error details
        return res.status(500).json({
            message: "Error while processing request",
            error: e.message
        });
    }
}

userRouter.post("/api/v1/user/signup", signupHandler);
// userRouter.post("/api/v1/signin", (req, res) => {

// })

// userRouter.post("/api/v1/signup", (req, res) => {

// })

export {userRouter};
