import mongoose from "mongoose";

const AdminsSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
});

export default mongoose.models.Admins || mongoose.model("Admins", AdminsSchema);
