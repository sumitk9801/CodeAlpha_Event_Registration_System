import mongoose from "mongoose";
import {registerEvent} from "../Controllers/eventController.js"

import express from "express"
const router = express.Router();

router.post("/registerEvent",registerEvent);
export default router;