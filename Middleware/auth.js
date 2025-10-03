import jwt from "jsonwebtoken"

const auth = async(req,res,next)=>{ //token check
    try{

        const token = req.header("Authorization")?.split(" ")[1];
        if(!token) return res.status(400).json({success:false,messsage:"no token provided"});
        
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = {id:decoded.id,role:decoded.role};
        next();
    }
    catch(error){
        console.log("auth error");
        res.json({message:error.message});
    }

}
const authorizedRole =(...allowedRoles)=>(req,res,next)=>{
    try{
        console.log(allowedRoles);
        console.log(req.user);

        if (!allowedRoles.includes(req.user.role)) {
          return res.status(403).json({ message: "Access denied" });
        }
        next();
    }catch(error){
        return res.json({message:error.message});

    }
}

export  {auth,authorizedRole};