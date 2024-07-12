const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const coursesSchema = new Schema(
  {
    courseName: { type: String, required: true },
    courseDescription: { type: String, required: true },
  },
  { timestamps: true }
);
const Course = mongoose.model("Courses", coursesSchema);
module.exports = Course;
