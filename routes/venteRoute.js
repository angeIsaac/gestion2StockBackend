import { createVente, deleteVente, getVenteById, getVentes, updateVente } from "../controllers/venteControllers.js";
import express from 'express';

const router = express.Router();

router.get("/getVente", getVentes);

router.get("/getVente/:id", getVenteById);

router.delete("/deleteVente/:id", deleteVente);

router.post("/createVente", createVente);

router.put("/updateVente/:id", updateVente);

export default router;