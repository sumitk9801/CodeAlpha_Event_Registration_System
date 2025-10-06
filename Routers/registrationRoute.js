
import express from "express";
import { userEventRegister,allEnrolledUsers ,removeUser} from "../Controllers/registrationController.js";
import {auth,authorizedRole} from "../Middleware/auth.js"

const router = express.Router();

router.post("/:eventId/",auth,userEventRegister);
router.get("/participated/:eventId",auth,authorizedRole("organizer","admin"),allEnrolledUsers);
router.get("/remove/:userId",auth,authorizedRole("organizer","admin"),removeUser);

export default router;