import { Router } from "express";
import { medicineControllers } from "../controllers/medicine.controllers.js";

const route = Router();

route.post("/createmedicine", (req, res) => medicineControllers.create(req, res));

export default route;