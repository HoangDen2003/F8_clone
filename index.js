const route = require("./src/routes/routes");
const db = require("./src/config/database/connectDB");

const handlebars = require("express-handlebars");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();
const port = 3000;

// todo: connect database
db.connect();

// todo: để phân phát các tệp tĩnh như hình ảnh, CSS, SASS, javascript dùng static
app.use(express.static(path.join(__dirname, "src/public")));

app.use(morgan("dev"));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "src/resources/views"));

route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
