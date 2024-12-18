import { Users } from "../db/models/users.js";
import bcrypt from 'bcryptjs';
import generateToken from "../utils/generateToken.js";
import { convertToB64 } from "../services/converToBinary.js";


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email });
        if (!user) res.status(404).json({ message: "User not found" });
        const motDePasseValide = await bcrypt.compare(password, user.password);
        if (!motDePasseValide) res.status(400).json({ message: "mot de passe invalide" });
        generateToken(res, user._id);
        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const signup = async (req, res) => {
    try {
        const body = req.body;
        const file = req.file;
        const alreadyExists = await Users.findOne({ email: body.email });
        if (alreadyExists) res.status(400).json({ message: "User already exists" });
        body.password = await bcrypt.hash(body.password, 12);
        if(file){
            body.image = await convertToB64(file.path);
        }
        const user = new Users(body).save();
        generateToken(res, user._id);
        res.status(201).json({ message: "Signup successful" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const logout = (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const me = async (req, res) => {
    try {
        const user = await Users.findById(req.userId).select("-password");
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
