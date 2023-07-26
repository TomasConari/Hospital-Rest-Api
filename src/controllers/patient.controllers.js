import { Patient } from "../models/patient.model.js";
import { Medicine } from "../models/medicine.model.js";

export const patientControllers = {
    create: async (req, res) => {
        const {role} = req.user;
        if(role === "health"){
            const {name, lastname, dni, medicalHistory} = req.body;
            try{
                const newPatient = {
                    name,
                    lastname,
                    dni,
                    medicalHistory
                };
                await Patient.create(newPatient);
                res.status(201).json({
                    ok: true,
                    data: newPatient
                });
            }catch(error){
                throw new Error;
            };
        }else{
            res.status(403).json({ 
                message: "Unauthorized - Only health workers can perform this action" 
            });
        };
    },
    update: async (req, res) => {
        const {role} = req.user;
        if(role === "health"){
            const {dni} = req.params;
            const newData = req.body;
            try{
                const updatedPatient = await Patient.findOneAndUpdate({dni:dni}, newData, { new: true });
                if(updatedPatient === null){
                    res.status(500).json({ 
                        message: "Could not find and update the patient" 
                    });
                }else{
                    res.status(200).json({ 
                        message: "Patient Updated",
                        data: updatedPatient
                    });
                };
            }catch(error){
                res.status(500).json({ 
                    message: "An error occurred during the update" 
                });
            };
        }else{
            res.status(403).json({ 
                message: "Unauthorized - Only health workers can perform this action" 
            });
        };
    },
    delete: async (req, res) => {
        const {role} = req.user;
        if(role === "health"){
            const {dni} = req.params;
            try{
                await Patient.deleteOne({dni:dni});
                res.status(200).json({ 
                message: "Patient deleted successfully",
                });
            }catch (error){
                res.status(500).json({ 
                    message: "An error occurred during the delete" 
                });
            };
        }else{
            res.status(403).json({ 
                message: "Unauthorized - Only health workers can perform this action" 
            });
        };
    },
    getAll: async (req, res) => {
        try{
            const allPatients = await Patient.find();
            res.status(200).json({ 
                data: allPatients
            });
        }catch(error){
            res.status(500).json({
                message: "An error occurred while retrieving patients"
            });
        };
    },
    getOne: async (req, res) => {
        const {dni} = req.params;
        try{
            const patient = await Patient.findOne({dni:dni})
            res.status(200).json({ 
                data: patient
            });
        }catch(error){
            res.status(500).json({
                message: "An error occurred while retrieving the patient"
            });
        };
    },
    addMedicine: async (req, res) => {
        const {role} = req.user;
        if(role === "health"){
            const {medicine, dni} = req.body;
            try{
                const foundMedicine = await Medicine.findOne({name:medicine.toLowerCase()});
                if(!foundMedicine){
                    return res.status(404).json({
                        message: "Medicine not found",
                    });
                };
                const patient = await Patient.findOneAndUpdate({dni:dni}, { $push:{ medicines:foundMedicine}}, {new:true});
                res.status(200).json({
                    data: patient,
                });
            }catch(error){
                res.status(500).json({
                    message: "An error occurred while adding medicine to the patient",
                });
            };
        }else{
            res.status(403).json({
                message: "Unauthorized - Only health workers can perform this action",
            });
        };
    },
    removeMedicine: async (req, res) => {
        const {role} = req.user;
        if(role === "health") {
            const {medicine, dni} = req.body;
            try{
                const foundMedicine = await Medicine.findOne({name:medicine.toLowerCase()});
                if (!foundMedicine) {
                    return res.status(404).json({
                        message: "Medicine not found",
                    });
                };
                const patient = await Patient.findOne({ dni: dni });
                if(!patient){
                    return res.status(404).json({
                        message: "Patient not found",
                    });
                };
                patient.medicines.pull(foundMedicine._id);
                await patient.save();
                res.status(200).json({
                    message: "Medicine removed from patient's records",
                    data: patient,
                });
            }catch(error){
                res.status(500).json({
                    message: "An error occurred while removing medicine from the patient",
                });
            };
        }else{
            res.status(403).json({
                message: "Unauthorized - Only health workers can perform this action",
            });
        };
    },
};