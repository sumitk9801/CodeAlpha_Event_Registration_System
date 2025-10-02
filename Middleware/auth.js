import jwt from "jsonwebtoken"

const auth = async(req,res)=>{
    try{

        const token = req.header("Authorization")?.split(" ")[1];
        if(!token) return res.status(400).json({success:false,messsage:"no token provided"});
        
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = {id:decoded.id};
        next();
    }
    catch(error){
        console.log("auth error");
        res.json({message:error.message});
    }

}