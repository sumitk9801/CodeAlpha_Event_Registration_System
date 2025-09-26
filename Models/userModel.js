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
    role: { type: String, enum: ["user", "organizer", "admin"], default: "user" },
    isVerified: { type: Boolean, default: false },
    registeredEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }]

},{ timestamps: true });

const bcrypt = require('bcrypt');

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

export const User = mongoose.model("User",userSchema);