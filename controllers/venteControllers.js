import { Vente } from "../db/models/vente.js";

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