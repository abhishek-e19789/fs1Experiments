import express from "express";
import logger from "./middleware/logger.middleware.js";
import studentRoutes from "./routes/student.route.js";

const app = express();

// Apply logging middleware globally
app.use(logger);

// Routes
app.use("/students", studentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Internal Server Error:", err.message);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));