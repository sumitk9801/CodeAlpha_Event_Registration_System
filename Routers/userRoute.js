import express from "express"
import {User} from "../Models/userModel.js"
import bcrpt from "bcrypt"
import { registerUser,loginUser,getAllUser } from "../Controllers/userController.js";


const router = express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/",getAllUser);

export default router;