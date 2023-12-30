const Allcourses = require("../models/AllCourses");
const User = require("../models/User");
const { multipleMongooseToObject } = require("../../util/mongoose");

class SiteController {
  async mainhome(req, res) {
    const courses = await Allcourses.find({}).lean();

    const locals = {
      title: "main",
    };
    res.render("home", {
      courses,
      locals,
      layout: "../layouts/main_home.handlebars",
    });
  }

  async home(req, res) {
    // var data = await CourseFree.aggregate([
    //   { $unionWith: "frontends" },
    //   { $unionWith: "backends" },
    // ]);

    // const user = await User.find({});

    // Allcourses.find({})
    //   .lean()
    //   .then((courses) => {
    //     res.render("home", { user, courses });
    //     // res.json(courses);
    //   })
    //   .catch((err) => {
    //     res.status(400).json({ err: "ERROR !!" });
    //   });

    try {
      const courses = await Allcourses.find({}).lean().exec();
      const user = await User.findOne({}).lean().exec();

      res.render("home", {
        courses,
        user,
      });
    } catch (error) {
      res.status(400).json({ error: "ERROR !!" });
    }
  }

  async authentication(req, res) {
    res.render("/authentication");
  }

  news(req, res) {
    res.render("news");
  }

  async learning_path(req, res) {
    const courses = await Allcourses.find({});
    res.render("learning_path", {
      courses,
    });
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
