import { Medicine } from "../models/medicine.model.js";

export const medicineControllers = {
    create: async (req, res) => {
        const {name, lab} = req.body;
        try{
            const newMedicine = {
                name: name.toLowerCase(),
                lab: lab.toLowerCase()
            };
            await Medicine.create(newMedicine);
            res.status(201).json({
                ok: true,
                data: newMedicine
            });
        }catch(error){
            throw new Error;
        };
    },
    update: async (req, res) => {
        const newData = req.body;
        try{
            const updatedMedicine = await Medicine.findOneAndUpdate({_id:newData.id}, newData, { new: true });
            if(updatedMedicine === null){
                res.status(500).json({ 
                    message: "Could not find or update the Medicine" 
                });
            }else{
                res.status(200).json({ 
                    message: "Medicine Updated",
                    data: updatedMedicine
                });
            };
        }catch(error){
            res.status(500).json({ 
                message: "An error occurred during the update" 
            });
        };
    },
    delete: async (req, res) => {
        const {name} = req.body;
        try{
            await Medicine.deleteOne({name:name});
            res.status(200).json({ 
                message: "Medicine deleted successfully",
            });
        }catch (error){
            res.status(500).json({ 
                message: "An error occurred during the delete" 
            });
        };
    },
    getAll: async (req, res) => {
        try{
            const allMedicine = await Medicine.find();
            res.status(200).json({ 
                data: allMedicine
            });
        }catch(error){
            res.status(500).json({
                message: "An error occurred while retrieving all Medicine"
            });
        };
    },
    getByName: async (req, res) => {
        const {name} = req.body;
        try{
            const medicine = await Medicine.findOne({name:name.toLowerCase()})
            res.status(200).json({ 
                data: medicine
            });
        }catch(error){
            res.status(500).json({
                message: "An error occurred while retrieving the Medicine"
            });
        };
    },
    getById: async (req, res) => {
        const {id} = req.body;
        try{
            const medicine = await Medicine.findOne({_id:id})
            res.status(200).json({ 
                data: medicine
            });
        }catch(error){
            res.status(500).json({
                message: "An error occurred while retrieving the Medicine"
            });
        };
    }
};