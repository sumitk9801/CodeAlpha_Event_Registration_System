import { User } from "../Models/userModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


// register the user
const registerUser = async(req,res)=>{    
  const {name,email,password,phone,role} = req.body;
    try{
    const existingUser = await User.findOne({email});
    // console.log(existingUser);
    if(existingUser){
        return res.status(400).json({message:"User Already exist"});
    } 

    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password,saltRound);

    
    const newUser = new User({
      name,
      email,
      password:hashedPassword,
      phone,
      role,
    });

    if(role=="admin") newUser.isVerified = true;

    await newUser.save();

    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

// login user
const loginUser = async(req,res)=>{
  const {email,password}=req.body;

  try{
    const user = await User.findOne({email});
    if(!user){return res.json({success:false,message:"User not found"});}

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch) return res.json({success:false,message:"Invalid email or password"});

    
    //creating jwt token 
    const token = jwt.sign(
      {id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:"1h"}
    )

    return res.json({success:true,message:"Login succesful",token});

  }catch(error){
    console.log("error");
    return res.json({status:false,message:error.message});
  }

}

// finding all users
const getAllUser = async(req,res)=>{
  try {

    const users =  await User.find({});
    
    if(!users || users.length==0) return res.json({message:"No user Found"});
    
    return res.json({
      success:true,
      totalUser : users.length,
      data:users
      
    })
    }catch(error){
      res.status(500).json({ success: false, message: error.message });
  }
}
// deleting the user
const deleteUser = async(req,res)=>{
  try{
    const user  =  await User.findOneAndDelete({email:req.body.email});
    if(!user) return res.json({success:false,message:"NO SUCH USER EXIST"});
    return res.json({success:true,message:"user is removed "});
  }catch(error){
    return res.json({success:false,message:error.message});
  }
}
export {registerUser,loginUser,getAllUser,deleteUser} ;