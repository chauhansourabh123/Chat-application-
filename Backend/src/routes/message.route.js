import express, { Router } from "express";
import authUser from "../middleware/auth.middleware.js"
import { sendMessage, getMessage } from "../controllers/message.controller.js";

const router = Router()

router.route("/send/:id").post(authUser, sendMessage)
router.route("/get/:id").get(authUser, getMessage)

export default router;