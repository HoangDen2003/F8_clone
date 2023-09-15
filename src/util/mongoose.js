// todo: xử lý data của DB khi dungf handlebars
module.exports = {
    multipleMongooseToObject: function (mongoose) {
      return mongoose.map((mongoose) => mongoose.toObject())
    },
    mongooseToObject: function (mongoose) {
      return mongoose ? mongoose.toObject() : mongoose
    },
  }
  