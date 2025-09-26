import express from "express"
import UserModel from "../Models/userModel.js"
import bcrpt from "bcrypt"
import { registerUser,loginUser,getAllUser } from "../Controllers/userController.js";


const router = express.Rouoter();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/admin",getAllUser);