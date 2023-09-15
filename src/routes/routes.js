const siteRouter = require("../routes/sites");
const learningRouter = require("../routes/learning_path");
const courses = require("../routes/courses");

function route(app) {
  app.use("/courses", courses);

  app.use("/learning_path", learningRouter);

  app.use("/", siteRouter);
}

module.exports = route;
