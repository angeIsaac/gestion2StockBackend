import { Vente } from "../db/models/vente.js";
import { Produit } from "../db/models/produit.js";

export const getVentes = async (req, res) => {
    try {
        const allVentes = await Vente.find();
        res.status(200).json(allVentes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getVenteById = async (req, res) => {
    try {
        const vente = await Vente.findById(req.params.id);
        if (!vente) res.status(404).json({ message: "Vente not found" });
        res.status(200).json(vente);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteVente = async (req, res) => {
    try {
        const id = req.params.id;
        if(!id) res.status(400).json({ message: "Id is required" });
        const vente = await Vente.findByIdAndDelete(id);
        res.status(200).json(vente);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const createVente = async (req, res) => {
    try {
        const { body } = req;
        if(!body) res.status(400).json({ message: "Body is required" });
        if(!vente.produit) res.status(400).json({ message: "ProduitId is required" });
        if(!vente.quantite) res.status(400).json({ message: "Quantite is required" });
        const produitExist = await Produit.findById(vente.produitId);
        if(produitExist.quantite < Vente.quantite && 0 < Vente.quantite)  res.status(400).json({ message: "quantite insuffisante" });
        produitExist.quantite -= vente.quantite;
        const newVente = await Vente(body).save();
        res.status(201).json(newVente);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const updateVente = async (req, res) => {
    try {
        const { body } = req;
        const id = req.params.id;
        if(!id && !body) res.status(400).json({ message: "Id is required" });
        const produitExist = await Produit.findById(vente.produit);
        const vente = await Vente.findById(id);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
        
    }
}