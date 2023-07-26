import { Router } from "express";
import { workerControllers } from "../controllers/worker.controllers.js";
import { tokenVerify } from "../middleware/token-verify.js";

const route = Router();

route.post("/createworker", (req, res) => workerControllers.create(req, res));
route.post("/worker/login", (req, res) => workerControllers.login(req, res));
route.put("/worker/update/:dni", tokenVerify, (req, res) => workerControllers.update(req, res));
route.delete("/worker/delete/:dni", tokenVerify, (req, res) => workerControllers.delete(req, res));
route.get("/worker/getall", tokenVerify, (req, res) => workerControllers.getAll(req, res));
route.get("/worker/getone/:dni", tokenVerify, (req, res) => workerControllers.getOne(req, res));

export default route;