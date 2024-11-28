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
        const id = req.params.id;
        if (!id) res.status(400).json({ message: "Id is required" });
        const achat = await Achat.findById(id);
        if (!achat) res.status(404).json({ message: "Achat not found" });
        res.status(200).json(achat);
    } catch (error) {
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
};

export const createAchat = async (req, res) => {
    try {
        const quantite = req.body.quantite;
        const body = req.body;
        let produit = await Produit.findById(req.body.produit);
        if (!produit) res.status(404).json({ message: "Produit not found" });
        produit.quantite = produit.quantite + quantite;
        await produit.save();
        const achat = new Achat(body).save();
        res.status(201).json(achat);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateAchat = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        if (!id&& !body) res.status(400).json({ message: "Id is required" });
        const achat = await Achat.findById(id);
        if (!achat) res.status(404).json({ message: "Achat not found" });
        let produit = await Produit.findById(body.produit);
        if (!produit) res.status(404).json({ message: "Produit not found" });
        if((produit.quantite + achat.quantite) < body.quantite) res.status(400).json({ message: "quantite insuffissante" });
        produit.quantite += (produit.quantite - achat.quantite) + body.quantite;
        await produit.save();
        const updatedAchat = await Achat.findByIdAndUpdate(id, req.body);
        res.status(200).json(updatedAchat);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
