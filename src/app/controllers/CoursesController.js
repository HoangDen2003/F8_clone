const Allcourses = require("../models/AllCourses");
const { mongooseToObject } = require("../../util/mongoose");

class CoursesController {
  // todo: [GET] /courses/:slug
  async show(req, res) {
    // todo: tìm kiếm theo field [slug], nếu true sẽ trả về document <là csdl có chứa slug đó>
    // todo: join collections together
    const course = await Allcourses.findOne({ slug: req.params.slug })
      .lean()
      .exec();
    res.render("courses/show", { course });
  }
}

module.exports = new CoursesController();
