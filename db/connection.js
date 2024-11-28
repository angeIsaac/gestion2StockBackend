import mongoose from "mongoose";

export const connect = async () => {
    try {
        await mongoose.connect(process.env.LOCAL_CONNECTION_STRING);
        console.log("Database connected");
    } catch (error) {
        console.log("Database connection failed");
    }
};