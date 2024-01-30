const User = require("../models/User");
const Allcourses = require("../models/AllCourses");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const { create } = require("connect-mongo");
const { userValidation } = require("../../middlewares/validation");
const {
  signAccessToken,
  verifyAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../../middlewares/jwt_service");
// const { verify } = require("crypto");
const JWT = require("jsonwebtoken");
const client = require("../../helpers/connection_redis");

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
    const courses = await Allcourses.find({});

    // todo: validate xem người nhập nhập thông tin có đúng kh
    const userReq = {
      email: req.body.email,
      password: req.body.password,
    };

    console.log(userReq);

    const errUserValidation = userValidation.validate(userReq);
    const user = await User.findOne({ email: userReq.email });
    const isCheckPassword = await bcrypt.compare(
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
    if (!isCheckPassword) {
      throw createError.Unauthorized("Mật khẩu không chính xác !!");
    }

    const accessToken = await signAccessToken(user._id);
    const refreshToken = await signRefreshToken(user._id);
    // console.log("refreshtoken id: ", refreshToken);

    res.render("home", { user, courses, layout: "../layouts/main" });

    // return res.json({ user: user.id, accessToken, refreshToken });
  } catch (error) {
    console.log(error);
  }
};

module.exports.logout = async (req, res) => {
  const { refreshToken } = req.body;
  // console.log(refreshToken);
  if (!refreshToken) {
    throw createError.BadRequest();
  }
  // todo: xác minh và lấy ra id tương ứng với refreshtoken
  const payload = await verifyRefreshToken(refreshToken);
  // console.log(payload);

  // todo: delete ridis
  client.del(payload.userId, (err, reply) => {
    if (err) throw createError.InternalServerError();
    if (payload.userId != reply) throw createError.Unauthorized();
  });
  res.json({
    message: "Đã xóa rồi, vào redis mà kiểm tra",
  });
};

module.exports.refresh_token = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    // console.log(refreshToken);
    // res.json(refreshToken);
    if (!refreshToken) throw createError.BadRequest();
    const payload = await verifyRefreshToken(refreshToken);
    // console.log(payload.userId);
    const accessTokenSign = await signAccessToken(payload.userId);
    const refreshTokenSign = await signRefreshToken(payload.userId);
    res.json({ accessTokenSign, refreshTokenSign });
  } catch (error) {
    next(error);
  }
};

module.exports.getList = async (req, res) => {
  // try {
  //   console.log(req.headers);
  //   const listUsers = [
  //     {
  //       email: "abc123@gmail.com",
  //     },
  //     {
  //       email: "edg@gmail.com",
  //     },
  //   ];

  //   if (!req.headers["authorization"]) {
  //     throw createError.Unauthorized();
  //   }

  //   const authHeader = req.headers["authorization"];
  //   // todo: tách chuỗi authHeader bởi dấu cách: Bearer <access_token>
  //   const bearerToken = authHeader.split(" ");
  //   const token = bearerToken[1];
  //   // todo: giải mã cái accesstoken để xác định là admin hay user để có thể phân quyền cho nó
  //   // secretOrPublicKey = process.env.ACCESS_TOKEN_SECRET
  //   // JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
  //   //   if (err) {
  //   //     throw createError.Unauthorized();
  //   //   }
  //   //   // console.log(payload);
  //   //   req.payload = payload;
  //   // });
  //   // res.json({ listUsers });

  //   const { userID } = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);
  //   console.log(userID);
  // } catch (error) {
  //   console.log(error);
  // }

  // const refreshToken = await signRefreshToken();

  const listUsers = [
    {
      email: "abc123@gmail.com",
    },
    {
      email: "edg@gmail.com",
    },
  ];
  res.json({ listUsers });
};
