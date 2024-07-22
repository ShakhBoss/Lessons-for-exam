const { decode1 } = require("../utils/jwt");

const isAdmin = (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ message: "Kirish mumkin emas" });
  }

  const decoded = decode1(token);
  if (!decoded) {
    return res.status(401).json({ message: "Token not valid or expired" });
  }

  if (!decoded.isAdmin) {
    console.log(decoded.isAdmin);
    return res.status(401).json({ message: "Siz admin emasiz" });
  }

  next();
};

module.exports = isAdmin;
