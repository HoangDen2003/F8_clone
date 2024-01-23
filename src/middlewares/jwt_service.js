const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const client = require("../helpers/connection_redis"); // redis

const signAccessToken = async (userId) => {
  return new Promise((resolve, reject) => {
    // todo: chứa thông tin cần mã hóa
    const payload = {
      userId,
    };

    const secret = process.env.ACCESS_TOKEN_SECRET;

    // todo: cấu hình token, thời gian hết hạn
    const options = {
      expiresIn: "10s",
    };

    // todo: create accesstoken
    JWT.sign(payload, secret, options, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};

const verifyAccessToken = async (req, res, next) => {
  if (!req.headers["authorization"]) {
    return next(createError.Unauthorized());
  }

  const authHeader = req.headers["authorization"];
  // todo: tách chuỗi authHeader bởi dấu cách: Bearer <access_token>
  const bearerToken = authHeader.split(" ");
  const token = bearerToken[1];
  // todo: giải mã cái accesstoken để xác định là admin hay user để có thể phân quyền cho nó
  // secretOrPublicKey = process.env.ACCESS_TOKEN_SECRET
  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      // return next(err);
      if (err.name == "JsonWebTokenError") {
        return next(createError.Unauthorized());
      }
      return next(createError.Unauthorized(err.message));
    }
    req.payload = payload;
    next();
  });
};

const signRefreshToken = async (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {
      userId,
    };
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const options = {
      expiresIn: "1y",
    };
    JWT.sign(payload, secret, options, (err, token) => {
      if (err) {
        reject(err);
      }
      // todo: add refresh token in redis
      client.set(
        userId.toString(),
        token,
        "EX",
        365 * 24 * 60 * 60,
        (err, reply) => {
          if (err) {
            return reject(createError.InternalServerError());
          }
        }
      );
      resolve(token);
    });
  });
};

const verifyRefreshToken = async (token) => {
  return new Promise((resolve, reject) => {
    // const { token } = req.body;
    JWT.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
      if (err) {
        return reject(err);
      }
      // todo: kiểm tra refresh khi login có được lưu trong redis hay không (blacklist)
      // ? payload.userId: vì nếu verifyRefreshToken không có lỗi thì sẽ trả về là dạng đối tượng trong đó có userId
      // ? reply: get key sẽ trả về value (reply)
      client.get(payload.userId, (err, reply) => {
        if (err) reject(createError.InternalServerError());
        if (token != reply) reject(createError.Unauthorized());
      });
      resolve(payload);
    });
  });

  // JWT.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
  //   if (err) {
  //     throw createError.Unauthorized(err.message);
  //   }
  //   // req.payload = payload;
  //   // console.log(payload);
  //   return payload;
  // });
};

module.exports = {
  signAccessToken,
  verifyAccessToken,
  signRefreshToken,
  verifyRefreshToken,
};
