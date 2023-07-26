import { Router } from "express";
import { patientControllers } from "../controllers/patient.controllers.js";
import { tokenVerify } from "../middleware/token-verify.js";

const route = Router();

route.post("/createpatient", tokenVerify, (req, res) => patientControllers.create(req, res));
route.put("/patient/update/:dni", tokenVerify, (req, res) => patientControllers.update(req, res));
route.put("/patient/medicine/add", tokenVerify, (req, res) => patientControllers.addMedicine(req, res));
route.put("/patient/medicine/remove", tokenVerify, (req, res) => patientControllers.removeMedicine(req, res));
route.delete("/patient/delete/:dni", tokenVerify, (req, res) => patientControllers.delete(req, res));
route.get("/patient/getall", tokenVerify, (req, res) => patientControllers.getAll(req, res));
route.get("/patient/getone/:dni", tokenVerify, (req, res) => patientControllers.getOne(req, res));

export default route;