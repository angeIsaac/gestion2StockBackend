import { login, logout, signup, me } from "../services/securite.js";
import express from "express";
import { upload } from "../utils/uploadUserFile.js";

const router = express.Router();

router.post("/login", login);

router.post("/signup", upload.single("image"),signup);

router.post("/logout", logout);

router.get("/getuser", me);

export default router;
