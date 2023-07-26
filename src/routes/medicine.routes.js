import { Router } from "express";
import { medicineControllers } from "../controllers/medicine.controllers.js";
import { tokenVerify } from "../middleware/token-verify.js";

const route = Router();

route.post("/createmedicine", (req, res) => medicineControllers.create(req, res));
route.put("/medicine/update", tokenVerify, (req, res) => medicineControllers.update(req, res));
route.delete("/medicine/delete", tokenVerify, (req, res) => medicineControllers.delete(req, res));
route.get("/medicine/getall", tokenVerify, (req, res) => medicineControllers.getAll(req, res));
route.get("/medicine/getbyname", tokenVerify, (req, res) => medicineControllers.getByName(req, res));
route.get("/medicine/getbyid", tokenVerify, (req, res) => medicineControllers.getById(req, res));

export default route;