const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1/F8");
    console.log("Successfully !!");
  } catch (error) { 
    console.log("Fail !!");
  }
}

module.exports = { connect };
