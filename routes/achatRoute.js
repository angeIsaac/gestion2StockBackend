import { createAchat, deleteAchat, getAchatById, getAchats, updateAchat } from "../controllers/achatController.js";
import express from 'express';
import verifyToken from "../utils/verifyToken.js";

const router = express.Router();

router.use(verifyToken);
router.get("/getAchat", getAchats);

router.get("/getAchat/:id", getAchatById);

router.delete("/deleteAchat/:id", deleteAchat);

router.post("/createAchat", createAchat);

router.put("/updateAchat/:id", updateAchat);

export default router;