const User = require("../models/User");
const createError = require("http-errors");
const { userValidation } = require("../../middlewares/validation");
const { create } = require("connect-mongo");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res) => {
  try {
    const newUser = {
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
    };
    const user = await User.findOne({ email: newUser.email });
    const errValidationUser = userValidation.validate(newUser);
    // todo: encode password
    const salt = await bcrypt.genSalt(10);
    const passwordOld = newUser.password;
    const passwordHashed = await bcrypt.hash(passwordOld, salt);

    // todo báo lỗi khi không nhập
    // if (!newUser.fullName || !newUser.email || !newUser.password) {
    //   throw createError(401, "Nhập méo đầy đủ !!");
    // }

    // console.log(errValidationUser);

    // todo: check email, password validation
    if (errValidationUser.error) {
      throw createError(errValidationUser.error.details[0].message);
    }

    // todo: check email exist
    if (user) {
      throw createError.Conflict(
        `${newUser.email} has already been registered`
      );
    }
    // todo: tạo newUserHashed mới dựa trên newUser và gán password cũ bằng password đã hash
    const newUserHashed = {
      fullName: req.body.fullName,
      email: req.body.email,
      password: passwordHashed,
    };
    await User.create(newUserHashed);

    // todo thấy bên postman
    return res.json(newUserHashed);
  } catch (error) {
    console.log(error);
  }
};

module.exports.login = async (req, res) => {
  try {
    // todo: validate xem người nhập nhập thông tin có đúng kh
    const userReq = {
      email: req.body.username,
      password: req.body.password,
    };

    const errUserValidation = userValidation.validate(userReq);
    const user = await User.findOne({ email: userReq.email });
    const comparePassword = await bcrypt.compare(
      userReq.password,
      user.password
    );

    // todo: check user validation
    if (errUserValidation.error) {
      throw createError(errUserValidation.error.details);
    }

    // todo: check email
    if (!user) {
      throw createError.NotFound("User not register !!");
    }

    // todo: check password
    if (!comparePassword) {
      throw createError.Unauthorized("Mật khẩu không chính xác !!");
    }

    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

module.exports.logout = async (req, res) => {
  res.send("Site Logout");
};

module.exports.refresh_token = async (req, res, next) => {
  res.send("!!!");
};
