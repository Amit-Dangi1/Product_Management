import { User } from "../model/user_model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const create = async (req,res,next) => {
    try {
        let{name,email,password}=req.body;
        
        let isUser = await User.findOne({email});
        if(isUser)
            return res.status(201).json({message:"Email Already Exists"});
        password = await bcrypt.hash(password,12);
        let createUser = await User.insertOne({name,email,password});
        if(!createUser)
            return res.json({message:"User not Create"});
            return res.status(201).json({message:"User Created"});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal Server Error"});
        
    }
};

export const login = async (req,res,next) => {
    try {
        let{email,password} = req.body;

        let isEmail = await User.findOne({email});
        if(!isEmail)
            return res.status(401).json({message:"Email is Invalid"});
        let isPassword = await bcrypt.compare(password,isEmail.password);
        if(!isPassword)
            return res.status(404).json({message:"Password is Invalid"});
        const token = generateToken(isEmail._id,isEmail.name,email)
        isEmail.password = undefined;
 res.cookie("token",token,{
  httpOnly: true,
  secure: false,  
  sameSite: "lax"
});
        return res.status(201).json({message:"Login Success",isEmail,token})

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal Server Error"});
        
    }
}

function generateToken(id,name,email){
let payload = {id,name,email};
let token = jwt.sign(payload,"amitdangijiii");
return token;
}