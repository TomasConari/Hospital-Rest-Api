import { Schema, model } from "mongoose";
import { medicineSchema } from "./medicine.model.js";

export const patientSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    dni: {
        type: String,
        require: true
    },
    medicalHistory: {
        type: String,
        require: true
    },
    medicines: {
        type: [medicineSchema]
    }
},
{
    timestamps: true
});

export const Patient = model("Patient", patientSchema);