import { Schema, model } from "mongoose";

export const workerSchema = new Schema({
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
    role: {
        type: String,
        require: true
    },
    position: {
        type: String,
        require: true
    }
},
{
    timestamps: true
});

export const Worker = model("Worker", workerSchema);