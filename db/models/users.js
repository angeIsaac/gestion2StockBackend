import { Schema, model } from "mongoose";

const userSchema = new Schema({
    nom: {
        type: String,
        required: true,
    },
    prenom: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    image:{
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
});

export const Users = model("User", userSchema);