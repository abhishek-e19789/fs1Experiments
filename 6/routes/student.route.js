import express from "express";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Public route: Student list");
});

router.get("/protected", auth, (req, res) => {
  res.send("Protected route: Only accessible with valid token");
});

export default router;