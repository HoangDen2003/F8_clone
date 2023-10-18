const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Allcourses = new Schema({
  name: { type: String, require: true },
  access: { type: String },
  image: { type: String },
  slug: { type: String, require: true },
  videoId: { type: String, require: true },
  description: { type: String },
  direction: { type: String },
  own_id: { type: mongoose.Schema.Types.ObjectId, ref: "Types" },
});

module.exports = mongoose.model("Allcourses", Allcourses);
