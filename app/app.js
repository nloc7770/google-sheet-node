const port = process.env.PORT || 3000;
const { writeData } = require("./google-sheet");

const init = async (app) => {
  app.get("/",  (req, res) => {
    try {
       writeData(res);
    } catch (error) {
      console.log(error);
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
