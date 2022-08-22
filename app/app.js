const port = process.env.PORT || 3000;
const { writeData } = require("./google-sheet");
const cron = require("node-cron");

const init = async (app) => {
  cron.schedule("35 * * * *", () => {
    // run when the minute of each hour is 10
    try {
      writeData();
    } catch (error) {
      // console.log(error);
    }
  });
  app.get("/healthcheck", async (req, res) => {
    try {
      return res.status(200).send(`API server started`);
    } catch (error) {
      return res.status(400).send(`connect failed: ${error.message}`);
    }
  });
  process.on("uncaughtException", function (err) {
    console.log(err);
  });
  app.listen(port, () => {
    console.info(`API server started on port ${port}`);
  });
  return app;
};

module.exports = init;
