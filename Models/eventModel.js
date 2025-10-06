import mongoose from "mongoose"

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true }, 
    location: { type: String, required: true },
    capacity: { type: Number, required: true },
    price: { type: Number, default: 0 }, 
    status: { 
        type: String, 
        enum: ["upcoming", "ongoing", "completed", "cancelled"], 
        default: "upcoming" 
    },
    organizerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    registrations: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
})

export const Event = mongoose.model("Event",eventSchema); 