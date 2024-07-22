const { checkingToken } = require("../utils/jwt");

const isAuth = (req, res, next) => {
  if (!req.headers.token)
    return res.status(401).json({ massage: "Kirish mumkin emas" });
  checkingToken(req.headers.token, (error, data) => {
    if (error) return res.status(401).json({ massage: "Kirish mumkin emas" });
    req.user = data;
    next();
  });
};

module.exports = isAuth;
