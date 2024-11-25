import mongoose from "mongoose";

export const connect = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Database connected");
    } catch (error) {
        console.log("Database connection failed");
    }
};