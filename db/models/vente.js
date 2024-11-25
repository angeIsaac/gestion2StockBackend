import { Schema, model } from "mongoose";

const schemaVente = new Schema({
    produit: {
        type: Schema.Types.ObjectId,
        ref: "Produit",
        required: true,
    },
    quantite: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

export const Vente = model("Vente", schemaVente);