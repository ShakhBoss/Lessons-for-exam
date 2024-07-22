const userRouter = require("../routes/userRouter");
const kursRouter = require("../routes/kusrRouter");
const darsRouter = require("../routes/darsRouter");

const modules = (app, express) => {
  app.use(express.json());
  app.use("/user", userRouter);
  app.use("/kurs", kursRouter);
  app.use("/dars", darsRouter);
 
};

module.exports = modules;
