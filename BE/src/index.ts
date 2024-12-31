import express from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
const app = express();

app.use(express.json());

app.post("/api/v1/signup", async(req, res) => {
    const requireBody = z.object({
        email: z.string().min(5).max(30).email(),
        firstname: z.string().min(2).max(50),
        lastName: z.string().min(2).max(100),
        userName: z.string().min(2).max(30),
        password: z.string().min(8).max(50).regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
    })
    const parsedDataWithSuccess = requireBody.safeParse(req.body);
    if (!parsedDataWithSuccess.success) {
        res.status(400).json({
            error: parsedDataWithSuccess.error,
            message: "Invalid Data Provided"
        })
        return;
    }
    try {
        const {email,firstname,lastName,userName,password}=parsedDataWithSuccess.data;
        const hashedPassword= await bcrypt.hash(password,5);
    }
    catch(e:any){
        console.log(e);
        res.status(500).json({error:e.message})
        return;
    }
})

app.post("/api/v1/signin", (req, res) => {

})

app.post("/api/v1/signup", (req, res) => {

})

app.listen(3000);