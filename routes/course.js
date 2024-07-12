const express = require("express");
const courseController = require("../controller/courseController");
const courseRouter = express.Router();

courseRouter.route("/")
.get(courseController.showCourse)
courseRouter.route("/createCourse")
.post(courseController.createCourse)
courseRouter.route("/updateCourse/:id")
.post(courseController.updateCourse)
courseRouter.route("/deleteCourse/:id")
.post(courseController.deleteCourse)

module.exports = courseRouter;
