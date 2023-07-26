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
        require: true,
        default: "health"
    },
    position: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
},
{
    timestamps: true
});

export const Worker = model("Worker", workerSchema);