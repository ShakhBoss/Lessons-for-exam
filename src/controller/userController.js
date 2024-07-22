const bcrypt = require("bcrypt");
const Joi = require("joi");
const prisma = require("../utils/connection");
const { createToken } = require("../utils/jwt");

const register = async (req, res, next) => {
  try {
    const { name, phoneNumber, password, isAdmin } = req.body;

    // validation
    const schema = Joi.object({
      phoneNumber: Joi.number().min(6).required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate({ phoneNumber, password });
    if (error) return res.status(404).json({ message: error.message });

    // hashing
    const hashedPas = await bcrypt.hash(password, 12);

    const users = await prisma.users.findUnique({ where: { phoneNumber } });

    if (users)
      return res.status(409).json({ message: "User already registered" });

    await prisma.users.create({
      data: { name, phoneNumber, password: hashedPas, isAdmin },
    });

    const token = createToken({ phoneNumber, isAdmin });

    res.json({ message: "Success", data: token });
    
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { phoneNumber } = req.body;

    await prisma.users.findUniqueOrThrow({ where: { phoneNumber } });
    const token = createToken({ phoneNumber });

    res.json({ message: "Success", data: token });

  } catch (error) {
    next(error);
  }
};
const loginAdmin = async (req, res, next) => {
  try {
    const { phoneNumber, isAdmin } = req.body;

    await prisma.users.findUniqueOrThrow({ where: { phoneNumber } });
    const token = createToken({ phoneNumber, isAdmin });

    res.json({ message: "Success", data: token });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, loginAdmin };
