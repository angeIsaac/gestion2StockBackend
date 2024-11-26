import { deleteProduit, getProduitById, getProduits, search, updateProduit } from "../controllers/produitControlers.js";
import express from 'express';

const router = express.Router();

router.get("/getProduit", getProduits);

router.get("/getProduit/:id", getProduitById);

router.delete("/deleteProduit/:id", deleteProduit);

router.put("/updateProduit/:id", updateProduit);

router.get("/search", search);

export default router;