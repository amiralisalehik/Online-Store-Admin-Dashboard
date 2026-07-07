import mongoose from "mongoose";

const AdminsSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "operator"],
    default: "operator",
    required: true,
  },
});

export default mongoose.models.Admins || mongoose.model("Admins", AdminsSchema);