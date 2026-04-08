import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/productsDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String
});
const Product = mongoose.model("Product", productSchema);

app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Add the products through postman
app.post("/api/products", async (req, res) => {
  const { name, price, category } = req.body;
  const newProduct = new Product({ name, price, category });
  await newProduct.save();
  res.status(201).json(newProduct);
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));