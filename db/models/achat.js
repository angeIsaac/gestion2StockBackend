import { model, Schema } from "mongoose";

const schemaAchat = new Schema({
    nom: {
        type: String,
        required: true,
    },
    montant: {
        type: Number,
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
    produit: {
        type: Schema.Types.ObjectId,
        ref: "Produit",
    },
});

export const Achat = model("Achat", schemaAchat);