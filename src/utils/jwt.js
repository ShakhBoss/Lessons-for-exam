const { verify, sign, decode } = require("jsonwebtoken");
const { jwt_secret_key, jwt_expires_in } = require("../../config/index");

const createToken = (payLoad) => {
  return sign(payLoad, jwt_secret_key, { expiresIn: jwt_expires_in });
};

const checkingToken = (token, callBack) => {
  return verify(token, jwt_secret_key, callBack);
};

const decode1 = (token) => {
  try {
    return decode(token);
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};

module.exports = { createToken, checkingToken, decode1 };
