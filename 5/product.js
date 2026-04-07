// models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    minlength: 3
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price must be positive"]
  },
  category: {
    type: String,
    enum: ["Electronics", "Clothing", "Books", "Food"],
    required: true
  },
  inStock: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

// Custom instance method
productSchema.methods.applyDiscount = function(percent) {
  this.price = this.price - (this.price * percent / 100);
  return this.price;
};

export default mongoose.model("Product", productSchema);