const Allcourses = require("../models/AllCourses");
const { multipleMongooseToObject } = require("../../util/mongoose");

class SiteController {
  async home(req, res) {
    // var data = await CourseFree.aggregate([
    //   { $unionWith: "frontends" },
    //   { $unionWith: "backends" },
    // ]);
    Allcourses.find({})
      .lean()
      .then((courses) => {
        res.render("home", { courses });
        // res.json(courses);
      })
      .catch((err) => {
        res.status(400).json({ err: "ERROR !!" });
      });
  }

  news(req, res) {
    res.render("news");
  }

  async learning_path(req, res) {
    const courses = await Allcourses.find({});
    res.render("learning_path", { courses });
  }

  async search(req, res) {
    const course = req.query.q;
    if (course != undefined) {
      const nameFind = await Allcourses.find({});
      const tmp = [];
      for (var i = 0; i < nameFind.length; i++) {
        const name = nameFind[i].name;
        if (name.toLowerCase().indexOf(course.toLowerCase()) > -1) {
          tmp.push(name);
        }
      }
      const data = await Allcourses.find({ name: { $in: tmp } }).lean();
      res.render("search", { data });
    } else {
      res.render("search");
    }
  }
}

module.exports = new SiteController();
