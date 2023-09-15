const Courses = require("../models/CourseFree");
const { mongooseToObject } = require("../../util/mongoose");

class CoursesController {
  // todo: [GET] /courses/:slug
  show(req, res) {
    // todo: tìm kiếm theo field [access: '115.232'], nếu true sẽ trả về document <là csdl có chứa access đó>
    Courses.findOne({ slug: req.params.slug })
      // ? convert sang object
      .lean()
      .then((course) => {
        res.render("courses/show", { course });
      })
      .catch();
  }
}

module.exports = new CoursesController();
