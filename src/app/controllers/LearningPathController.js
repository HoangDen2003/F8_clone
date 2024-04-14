const Allcourses = require("../models/AllCourses");
const Types = require("../models/Types");
const { multipleMongooseToObject } = require("../../util/mongoose");
const { connect } = require("mongoose");

class LearningPathController {
  async front_end(req, res) {
    const courses = await Allcourses.find({});
    const collection = await Allcourses.find({
      $or: [{ direction: "global" }, { direction: "Front-end" }],
    })
      .lean()
      .exec();
    // res.render("learning_path/front_end", { collection });
    res.render("learning_path/front_end", {
      collection,
      courses,
      layout: "../layouts/main",
    });
  }

  async back_end(req, res) {
    const courses = await Allcourses.find({});
    const collection = await Allcourses.find({
      $or: [{ direction: "global" }, { direction: "Back-end" }],
    })
      .lean()
      .exec();
    res.render("learning_path/back_end", { collection, courses });
  }
}

module.exports = new LearningPathController();
