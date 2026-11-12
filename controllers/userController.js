const users = require("../model/userModel");
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


exports.registerController=async(req,res)=>{
    console.log("Inside Register Controller");
    console.log(req.body);
    const {name,email,mobile,password,role}=req.body
    const isExisting=await users.findOne({email})
    if(isExisting){
        res.status(409).json({message:"User Already exist"})
    }else{
        const encPass=await bcrypt.hash(password,10)
        const newUser=await users.create({name,email,mobile,password:encPass,role})
        res.status(201).json({message:"User Created",data:newUser})
    }
}

//Login Controller
exports.loginController=async(req,res)=>{
    console.log("Inside LoginController");
    const {email,password,role}=req.body
    const isEXisting=await users.findOne({email})
    if(isEXisting){
        const isPassMatch=await bcrypt.compare(password,isEXisting.password)
        if(isPassMatch){
            const token=await jwt.sign({userMail:email,role:role},process.env.SecretKey)
            res.status(200).json({message:"User Found",data:isEXisting,token:token})
        }else{
            res.status(401).json({message:"Password not match..."})
        }
    }else{
        res.status(400).json({message:"User not Found..."})
    }
}