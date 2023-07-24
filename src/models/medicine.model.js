import { Schema, model } from "mongoose";

export const medicineSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    lab: {
        type: String,
        require: true
    }
},
{
    timestamps: true
});

export const Medicine = model("Medicine", medicineSchema);