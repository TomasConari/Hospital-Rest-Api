import express from "express";
import bodyParser from "body-parser";
import { conn } from "./database/db.js";
import userRoutes from "./routes/user.routes.js"
import productRoutes from "./routes/product.routes.js"

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));

const PORT = 3000;

//routes
app.use(userRoutes);
app.use(productRoutes);

conn();

app.listen(PORT, () => {
    console.log(`Running in http://localhost:${PORT}`);
});