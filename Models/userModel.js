import mongoose from "mongoose"

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role: { type: String, enum: ["user", "organizer", "admin"], default: "user" },
    isVerified: { type: Boolean, default: false },
    registeredEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }]

},{ timestamps: true });

export const User = mongoose.model("User",userSchema);