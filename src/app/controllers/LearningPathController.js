const CourseFree = require("../models/CourseFree");
const { multipleMongooseToObject } = require("../../util/mongoose");

class LearningPathController {
  front_end(req, res) {
    res.send("Okeee");
  }

  back_end(req, res) {
    res.send("back end");
  }
}

module.exports = new LearningPathController();
