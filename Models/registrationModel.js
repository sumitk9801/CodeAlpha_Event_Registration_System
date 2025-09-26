import mongoose from "mongoose"
 
const regisrationSchema = new mongoose.Schema({
  UserId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  registrationDate: { type: Date, default: Date.now },
  status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "confirmed" },
  paymentStatus: { type: String, enum: ["unpaid", "paid", "refunded"], default: "unpaid" },
  ticketId: { type: String }  
});

export const Registration = mongoose.model("Registration", regisrationSchema);