import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: 3
  },
  age: {
    type: Number,
    min: 5,
    max: 100,
    required: true
  },
  course: {
    type: String,
    enum: ["Math", "Science", "English", "Computer Science"],
    required: true
  },
  enrolledAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Student", studentSchema);