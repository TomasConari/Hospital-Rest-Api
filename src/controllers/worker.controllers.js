import { Worker } from "../models/worker.model.js";
import * as bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

export const workerControllers = {
    create: async (req, res) => {
        const {name, lastname, dni, position, password} = req.body;
        try{
            const hash = await bcrypt.hash(password, 10);
            const newWorker = {
                name,
                lastname,
                dni,
                position,
                password: hash
            };
            await Worker.create(newWorker);
            res.status(201).json({
                ok: true,
                data: newWorker
            });
        }catch (error){
            throw new Error;
        };
    },
    login: async (req, res) => {
        const {dni, password} = req.body;
        try{
            const user = await Worker.findOne({dni:dni});
            const hash = user.password;
            bcrypt.compare(password, hash, (err, result) => {
                if(result){
                    const {_id , name, lastname, dni, role, position} = user;
                    const payload = {
                        id: _id,
                        name,
                        lastname,
                        dni,
                        role,
                        position
                    };
                    const token = Jwt.sign(payload, "secretKey");
                    res.status(200).json({
                        token
                    });
                }else{
                    res.status(401).json({
                        message: "Incorrect Password"
                    });
                };
            });
        }catch(error){
            throw new Error;
        };
    },
    update: async (req, res) => {
        const {role} = req.user;
        if(role === "admin"){
            const {dni} = req.params;
            const newData = req.body;
            try{
                const updatedWorker = await Worker.findOneAndUpdate({dni:dni}, newData, { new: true });
                if(updatedWorker === null){
                    res.status(500).json({ 
                        message: "Could not find and update the worker" 
                    });
                }else{
                    res.status(200).json({ 
                        message: "Worker Updated",
                        data: updatedWorker
                    });
                };
            }catch(error){
                res.status(500).json({ 
                    message: "An error occurred during the update" 
                });
            };
        }else{
            res.status(403).json({ 
                message: "Unauthorized - Only admin can perform this action" 
            });
        };
    },
    delete: async (req, res) => {
        const {role} = req.user;
        if(role === "admin"){
            const {dni} = req.params;
            try{
                await Worker.deleteOne({dni:dni});
                res.status(200).json({ 
                message: "Worker deleted successfully",
                });
            }catch (error){
                res.status(500).json({ 
                    message: "An error occurred during the delete" 
                });
            };
        }else{
            res.status(403).json({ 
                message: "Unauthorized - Only admin can perform this action" 
            });
        };
    },
    getAll: async (req, res) => {
        try{
            const allWorkers = await Worker.find();
            res.status(200).json({ 
                data: allWorkers
            });
        }catch(error){
            res.status(500).json({
                message: "An error occurred while retrieving workers"
            });
        };
    },
    getOne: async (req, res) => {
        const {dni} = req.params;
        try{
            const worker = await Worker.findOne({dni:dni})
            res.status(200).json({ 
                data: worker
            });
        }catch(error){
            res.status(500).json({
                message: "An error occurred while retrieving the worker"
            });
        };
    }
};