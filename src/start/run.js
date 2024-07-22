const config = require("../../config/index");

const runner = async (app) => {
  const port = config.port;
  app.listen(port, () => {
    console.log(port);
  });
};

module.exports = runner;

