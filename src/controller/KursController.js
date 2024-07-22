const Joi = require("joi");
const prisma = require("../utils/connection");

const create = async (req, res, next) => {
  try {
    const { title, description, photoname } = req.body;

    // validation
    const schema = Joi.object({
      title: Joi.string().min(6).required(),
      description: Joi.string().min(6).required(),
     
    });

    const { error } = schema.validate({ title, isbn });
    if (error) return res.status(404).json({ message: error.message });

    const kurs = await prisma.kurslar.create({
      data: { title, description, photoname },
    });
    res.json({ message: "Success", data: kurs });
  } catch (error) {
    next(error);
  }
};

const find = async (req, res, next) => {
  try {
    const { id } = req.params;

    const kurs = await prisma.kurslar.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        photoname: true,
        _count: { select: { darslar: true } },
      },
    });

    if (!kurs) {
      return res.status(404).json({ message: "Kurs not found" });
    }

    res.json({ message: "Success", data: kurs });
  } catch (error) {
    next(error);
  }
};

const findAll = async (req, res, next) => {
  try {
    const kurs = await prisma.kurslar.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        photoname: true,
        _count: { select: { darslar: true } },
      },
    });

    if (!kurs) {
      return res.status(404).json({ message: "Kurs not found" });
    }

    res.json({ message: "Success", data: kurs });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, photoname } = req.body;
    const kurs = await prisma.kurslar.findUnique({ where: id });

    if (!kurs) {
      return res.status(404).json({ message: "Kurs not found" });
    }

    const kursUpdate = await prisma.kurslar.update({
      where: { id },
      data: { title, description, photoname },
    });

    res.json({ message: "Success", data: kursUpdate });
  } catch (error) {
    next(error);
  }
};
const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    const kurs = await prisma.kurslar.delete({ where: id });

    res.json({ message: "Success", data: kurs });
  } catch (error) {
    next(error);
  }
};

module.exports = { create, find, findAll, update, remove };
