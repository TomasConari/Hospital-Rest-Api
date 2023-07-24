import { Router } from "express";
import { workerControllers } from "../controllers/worker.controllers.js";

const route = Router();

route.post("/createworker", (req, res) => workerControllers.create(req, res));

export default route;