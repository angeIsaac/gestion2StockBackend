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

export const deleteProduit = async (req, res) => {
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
        const updatedProduit = await Produit.findByIdAndUpdate(id, produit, {new: true});
        res.status(200).json({message: "creation de produit reussi"}, updatedProduit);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
};

export const query = async (req, res) => {
    try {
        const query = req.query; // Obtenir les paramètres de requête

        // Extraire les options de la requête (tri, pagination, projection)
        const { limit, skip, ...filters } = query;

        // Construire les options Mongoose
        const options = {};

        // Limite de résultats
        if (limit) {
            options.limit = parseInt(limit, 10);
        }

        // Sauter un certain nombre de résultats (pagination)
        if (skip) {
            options.skip = parseInt(skip, 10);
        }

        // Projection des champs (sélectionner des champs spécifiques)
        let projection = null;
        if (fields) {
            projection = fields.split(',').join(' '); // Exemple : `?fields=name,price`
        }

        // Requête à la base de données
        const produits = await Produit.find(filters, projection, options).exec();

        // Répondre avec les produits trouvés
        res.status(200).json(produits);
    } catch (error) {
        console.error('Error in query function:', error);
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