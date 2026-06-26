import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: String,
    price: Number,
    desc: String,
    image: String,
    category: String,
  },
  { timestamps: true, collection: "Products" },
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
