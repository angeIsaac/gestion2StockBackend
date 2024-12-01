import { Produit } from "../db/models/produit.js";

export const getProduits = async (req, res) => {
    try {
        const produits = await Produit.find();
        res.status(200).json(produits);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getProduitById = async (req, res) => {
    try {
        const produit = await Produit.findById(req.params.id);
        if (!produit) res.status(404).json({ message: "Produit not found" });
        res.status(200).json(produit);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteProduit = async (req, res) =>{
    try{
        const id = req.params;
        const produit = await Produit.findByIdAndDelete(id);
        if(!produit) res.status(404).json({message: "Produit not found"});
        res.status(200).json({message: "Produit deleted"});
    }
    catch(error){
        console.log(error)
        res.status(500).json("internal server error")
    }
}

export const updateProduit = async (req, res) =>{
    try {
        const id = req.params;
        const produit = req.body;
        const produitAlreadyExist = await Produit.findById(id);
        if(!produitAlreadyExist) res.status(404).json({message: "Produit not found"});
        Object.assign(produitAlreadyExist, produit);
        produitAlreadyExist.save();
        res.status(200).json({message: "creation de produit reussi"}, produitAlreadyExist);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
};

export const search = async (req, res) => {
    try {
        const search = req.query.search;
        const produits = await Produit.find({ $text: { $search: search } });
        res.status(200).json(produits);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const createProduit = async (req, res) => {
    try {
        const { body } = req;
        const produit = await new Produit(body).save();
        res.status(200).json(produit);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};