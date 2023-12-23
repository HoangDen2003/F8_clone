const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Users = new Schema({
  googleId: { type: String },
  fullName: { type: String },
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String, unique: true },
  image: { type: String },
  password: { type: String },
  createAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Users", Users);
