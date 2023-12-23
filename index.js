require("dotenv").config();

const route = require("./src/routes/routes");
const db = require("./src/config/database/connectDB");
// const db_cloud = require("./src/config/database/connectDB_cloud");

const handlebars = require("express-handlebars");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();
const port = 3000;
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
// const router = require("./src/middlewares/auth");

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1/F8",
    }),
  })
);

// todo -> initialize: khởi tạo passport
app.use(passport.initialize());
// todo -> passport.sesstion: duy trì trạng thái đăng nhập
app.use(passport.session());

// todo: connect database cloud để lưu thông tin user
// db_cloud.connectDB_cloud();

// todo: connect database
db.connect();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// todo: để phân phát các tệp tĩnh như hình ảnh, CSS, SASS, javascript dùng static
app.use(express.static(path.join(__dirname, "src/public")));

app.use(morgan("dev"));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "src/resources/views"));

// ! WARNING !
// app.use("/", require("./src/middlewares/auth"));

route(app);

// app.use(route)

app.get("*", function (req, res) {
  res.status(404).render("404");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
