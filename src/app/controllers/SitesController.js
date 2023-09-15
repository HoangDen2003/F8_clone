const CourseFree = require("../models/CourseFree");
const { multipleMongooseToObject } = require("../../util/mongoose");

class SiteController {
  home(req, res) {
    // res.render("home");

    CourseFree.find({})
      .then((courses) => {
        res.render("home", { courses: multipleMongooseToObject(courses) });
        // res.json(courses);
      })
      .catch((err) => {
        res.status(400).json({ err: "ERROR !!" });
      });
  }

  news(req, res) {
    res.render("news");
  }

  learning_path(req, res) {
    res.render("learning_path");
  }
}

module.exports = new SiteController();
