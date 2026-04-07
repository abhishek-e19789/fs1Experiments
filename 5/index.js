import express from "express";
import mongoose from "mongoose";
import Product from "./product.js";
import studentRoutes from "./routes/student.route.js";

const app = express();
app.use(express.json());
app.use("/students", studentRoutes);

app.set("view engine", "ejs");
app.set("views", "./views");

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/productsDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// CREATE
app.post("/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ (all)
app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// READ (by ID)
app.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE
app.put("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ error: "Not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});


// DELETE
app.delete("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));