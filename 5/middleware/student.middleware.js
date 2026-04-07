// middleware/validateStudent.js
export default function validateStudent(req, res, next) {
  const { name, age, course } = req.body;
  if (!name || !age || !course) {
    return res.status(400).send("All fields are required");
  }
  next();
}