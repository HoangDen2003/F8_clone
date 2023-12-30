const siteRouter = require("../routes/sites");
const learningRouter = require("../routes/learning_path");
const courses = require("../routes/courses");
const authRouters = require("../middlewares/auth");
const jwtRouter = require("../routes/jwt")

function route(app) {
  app.use("/courses", courses);

  app.use("/learning_path", learningRouter);

  app.use("/authentication", jwtRouter)
 
  // app.use("/auth/google", authRouters);
  app.use("/", authRouters);

  app.use("/", siteRouter);
}

module.exports = route;
