import { User } from "../Models/userModel.js"
import bcrypt from "bcrypt"
const registerUser = async(req,res)=>{    
  const {name,email,password,phone} = req.body;
    try{
    const existingUser = User.findOne({email});
    console.log(existingUser.data);
    if(existingUser){
        return res.status(400).json({message:"User Already exist"});
    } 

    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(password,saltRound);

    const newUser = new User({
      name,
      email,
      password:hashedPassword,
      phone
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}
const loginUser = async(req,res)=>{
  const {email,password}=req.body;

  try{
    const user =  User.findOne({email});
    if(!user){return res.json({success:false,message:"Register the User"});}

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch) return res.json({success:false,message:"Invalid email or password"});

    return res.json({success:true,message:"Login succesful" , user:user.password});

  }catch(error){
    console.log("error");
    return res.json({status:false,message:error.message});
  }

}
const getAllUser = async(req,res)=>{
try {

  const users =  await User.find({});
  
  if(!users || users.length==0) return res.json({message:"No user Found"});

  console.log(users)
  
  return res.json({
    success:true,
    totalUser : users.length,
    data:users
    
  })
}catch(error){
   res.status(500).json({ success: false, message: error.message });
}


}
export {registerUser,loginUser,getAllUser} ;