import express from "express"

// import bcrpt from "bcrypt"
import {auth,authorizedRole} from "../Middleware/auth.js"
import { registerUser,loginUser,getAllUser ,deleteUser} from "../Controllers/userController.js";


const router = express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/",auth,authorizedRole("admin"),getAllUser);
router.post("/delete",deleteUser);

export default router;