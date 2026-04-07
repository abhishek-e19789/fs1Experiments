// routes/studentRoutes.js
import express from "express";
import { getStudents, createStudent, editStudent, updateStudent, deleteStudent } from "../controllers/students.controller.js";
import validateStudent from "../middleware/student.middleware.js";

const router = express.Router();

router.get("/", getStudents);
router.post("/", validateStudent, createStudent);
router.get("/:id/edit", editStudent);
router.post("/:id", validateStudent, updateStudent);
router.post("/:id/delete", deleteStudent);

export default router;