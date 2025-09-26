import userModel from "../Models/userModel.js"
import bcrypt from "bcrypt"
const registerUser = async(req,res)=>{    const {name,email,password,phone} = req.body;
    try{
    const existingUser = await userModel.findOne({email});
    if(existingUser){
        return res.status(400).json({message:"User Already exist"});
    }    const newUser = new userModel({
        name,
        email,
        password,
        phone
    });
    await  newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}
const loginUser = async(req,res)=>{

}
const getAllUser = async(req,res)=>{

}
export {registerUser,loginUser,getAllUser} ;