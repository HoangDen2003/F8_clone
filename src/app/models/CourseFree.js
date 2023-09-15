const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CourseFree = new Schema({
  name: { type: String, require: true },
  access: { type: String },
  image: { type: String },
  slug: { type: String, require: true },
  videoId: { type: String, require: true },
  description: { type: String },
});

module.exports = mongoose.model("CourseFree", CourseFree);
