import { Router } from "express";
import { patientControllers } from "../controllers/patient.controllers.js";

const route = Router();

route.post("/createpatient", (req, res) => patientControllers.create(req, res));

export default route;