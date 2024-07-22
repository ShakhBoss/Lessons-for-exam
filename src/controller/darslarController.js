const Joi = require("joi");
const prisma = require("../utils/connection");

const create = async (req, res, next) => {
  try {
    const { title,  videoname } = req.body;

    // validation
    const schema = Joi.object({
      title: Joi.string().min(6).required(),
    });

    const { error } = schema.validate({ title });
    if (error) return res.status(404).json({ message: error.message });

    const dars = await prisma.darslar.create({
      data: { title, videoname },
    });
    res.json({ message: "Success", data: dars });
  } catch (error) {
    next(error);
  }
};

const find = async (req, res, next) => {
  try {
    const { id } = req.params;

    const dars = await prisma.darslar.findUnique({where: { id }});

    if (!dars) {
      return res.status(404).json({ message: "Dars not found" });
    }

    res.json({ message: "Success", data: dars });
  } catch (error) {
    next(error);
  }
};

const findAll = async (req, res, next) => {
  try {
    const darslar = await prisma.darslar.findMany();

    if (!darslar) {
      return res.status(404).json({ message: "Dars not found" });
    }

    res.json({ message: "Success", data: darslar });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, videoname } = req.body;
    const dars = await prisma.darslar.findUnique({ where: id });

    if (!dars) {
      return res.status(404).json({ message: "Dars not found" });
    }

    const darsUpdate = await prisma.darslar.update({
      where: { id },
      data: { title, videoname },
    });

    res.json({ message: "Success", data: darsUpdate });
  } catch (error) {
    next(error);
  }
};
const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    const dars = await prisma.darslar.delete({ where: id });

    res.json({ message: "Success", data: dars });
  } catch (error) {
    next(error);
  }
};

module.exports = { create, find, findAll, update, remove };
