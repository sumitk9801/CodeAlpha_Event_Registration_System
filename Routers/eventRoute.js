import mongoose from "mongoose";
import {auth,authorizedRole} from "../Middleware/auth.js"
import {deleteEvent, registerEvent,showAllEvents} from "../Controllers/eventController.js"

import express from "express"
const router = express.Router();

router.post("/register",auth,authorizedRole("organizer","admin"),registerEvent);
router.post("/delete",auth,authorizedRole("organizer","admin"),deleteEvent);
router.get("/",auth,authorizedRole("admin"),showAllEvents);


export default router;