import { Router } from "express";
import {
  register,
  login,
  logout,
  getAllUsers,
  getUser,
  changeProfileImage,
  changeUsername
} from "../controllers/user.controller.js";
import authUser from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(authUser, logout);
router.route("/getUsers").get(authUser, getAllUsers);
router.route("/getUser/:id").get(getUser);
router.route("/changeProfileImage").post(authUser, upload.single('avatar'), changeProfileImage);
router.route("/changeUsername").put(authUser, changeUsername);

export default router;
