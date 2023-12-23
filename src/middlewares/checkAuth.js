module.exports.isLogged = function (req, res, next) {
  req.user ? next() : res.status(401).send("bạn chưa đăng nhập !!");
};
