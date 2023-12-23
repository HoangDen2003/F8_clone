const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectDB_cloud = async () => {
  try {
    const connectString = mongoose.connect(process.env.MONGODB_URL);
    console.log(
      `Connect Database Cloud Success: ${(await connectString).connection.host}`
    );
  } catch (error) {
    console.log("Error Connect Database Cloud !!");
  }
};

module.exports = { connectDB_cloud };
