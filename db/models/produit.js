import { Schema, model } from "mongoose";


const schemaProduit = new Schema({
    nom: {
        type: String,
        required: true,
    },
    prix: {
        type: Number,
        required: true,
    },
    refference: {
        type: String,
        required: true,
    },
    poids: {
        type: Number,
        required: true,
    },
    date : {
        type: Date,
        default: Date.now
    },
    quantite: {
        type: Number,
        required: true,
    },
});

export const Produit = model("Produit", schemaProduit);