const express = require("express");
const sectionController = require("../controller/sectionController");
const sectionRouter = express.Router();
const { requireAuth } = require('../middleware/auth')


sectionRouter.route("/")
.get(sectionController.showSection)
sectionRouter.route("/addSection")
.get(sectionController.addSectionForm)
sectionRouter.route("/addSection")
.post(sectionController.addSection)
sectionRouter.route("./deleteSection/:id")
.post(sectionController.deleteSection)
// sectionRouter.route("/updateCourse/:id")
// .post(sectionController.updateCourse)
// sectionRouter.route("/deleteCourse/:id")
// .post(sectionController.deleteCourse)

module.exports = sectionRouter;
