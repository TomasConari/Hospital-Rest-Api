import { Patient } from "../models/patient.model.js";

export const patientControllers = {
    create: async (req, res) => {
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
    }
};