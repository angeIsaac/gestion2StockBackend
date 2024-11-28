import { Achat } from "../db/models/achat.js";
import { Produit } from "../db/models/produit.js";

export const getAchats = async (req, res) => {
    try {
        const allAchats = await Achat.find();
        res.status(200).json(allAchats);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getAchatById = async (req, res) => {
    try {
        const achat = await Achat.findById(req.params.id);
        if (!achat) res.status(404).json({ message: "Achat not found" });
        res.status(200).json(achat);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteAchat = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) res.status(400).json({ message: "Id is required" });
        const achat = await Achat.findByIdAndDelete(id);
        res.status(200).json(achat);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const createAchat = async (req, res) => {
    try {
        const { body } = req;
        if (!body) res.status(400).json({ message: "Body is required" });
        if (!body.produit) res.status(400).json({ message: "ProduitId is required" });
        if (!body.quantite) res.status(400).json({ message: "Quantite is required" });
        const produitExist = await Produit.findById(body.produit);
        produitExist.quantite += body.quantite;
        await produitExist.save();
        const newAchat = await Achat(body).save();
        res.status(201).json(newAchat);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}