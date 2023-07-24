import { Medicine } from "../models/medicine.model.js";

export const medicineControllers = {
    create: async (req, res) => {
        const {name, lab} = req.body;
        try{
            const newMedicine = {
                name,
                lab
            };
            await Medicine.create(newMedicine);
            res.status(201).json({
                ok: true,
                data: newMedicine
            });
        }catch(error){
            throw new Error;
        };
    }
};