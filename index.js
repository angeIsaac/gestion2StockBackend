import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connect } from "./db/connection.js";
import securiteRoute from "./routes/securiteRoute.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use("/api/v1/user", securiteRoute);
app.use("/api/v1/produit", produitRoute);

app.listen(port, () => {
    connect();
    console.log(`Server is running on port ${process.env.PORT}`);
});