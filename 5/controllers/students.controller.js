// controllers/students.controller.js
import Student from "../models/students.model.js";

export const getStudents = async (req, res, next) => {
  try {
    const students = await Student.find();
    res.render("students/index", { students });
  } catch (err) {
    next(err);
  }
};

export const createStudent = async (req, res, next) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.redirect("/students");
  } catch (err) {
    next(err);
  }
};

export const editStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    res.render("students/edit", { student });
  } catch (err) {
    next(err);
  }
};

export const updateStudent = async (req, res, next) => {
  try {
    await Student.findByIdAndUpdate(req.params.id, req.body, { runValidators: true });
    res.redirect("/students");
  } catch (err) {
    next(err);
  }
};

export const deleteStudent = async (req, res, next) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.redirect("/students");
  } catch (err) {
    next(err);
  }
};