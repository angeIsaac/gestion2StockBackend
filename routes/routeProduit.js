import { deleteProduit, getProduitById, getProduits, search, updateProduit, createProduit } from "../controllers/produitControlers.js";
import express from 'express';
import verifyToken from "../utils/verifyToken.js";

const router = express.Router();

router.use(verifyToken);
router.get("/getProduit", getProduits);

router.get("/getProduit/:id", getProduitById);

router.delete("/deleteProduit/:id", deleteProduit);

router.put("/updateProduit/:id", updateProduit);

router.get("/search", search);

router.post("/createProduit", createProduit);

export default router;