const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Types = new Schema({
  typeName: { type: String, require: true },
});

module.exports = mongoose.model("Types", Types);
