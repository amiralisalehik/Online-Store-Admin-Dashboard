import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  user: {
    name: String,
    email: String,
    phone: String,
    city: String,
    address: String,
    postalCode: Number,
  },
  cart: [
    {
      _id: { type: String },
      title: String,
      desc: String,
      image: String,
      category: String,
      price: Number,
      quantity: Number,
    },
    { _id: false },
  ],
  totalPrice: Number,
  status: { type: String, default: "pending" },
  createdAt: { type: String, default: Date.now },
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
