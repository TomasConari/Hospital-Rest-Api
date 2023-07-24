import { Worker } from "../models/worker.model.js";

export const workerControllers = {
    create: async (req, res) => {
        const {name, lastname, dni, role, position} = req.body;
        try{
            const newWorker = {
                name,
                lastname,
                dni,
                role,
                position
            };
            await Worker.create(newWorker);
            res.status(201).json({
                ok: true,
                data: newWorker
            });
        }catch(error){
            throw new Error;
        };
    }
};