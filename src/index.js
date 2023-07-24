import express from "express";
import bodyParser from "body-parser";
import { conn } from "./database/db.js";
import workerRoutes from "./routes/worker.routes.js";
import medicineRoutes from "./routes/medicine.routes.js";
import patientRoutes from "./routes/patient.routes.js";

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));

const PORT = 3000;

app.use(workerRoutes);
app.use(patientRoutes);
app.use(medicineRoutes);

conn();

app.listen(PORT, () => {
    console.log(`Running in http://localhost:${PORT}`);
});