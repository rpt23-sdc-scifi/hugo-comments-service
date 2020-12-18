require("newrelic");

const express = require("express");
const cors = require("cors");
const path = require("path");
const expressStaticGzip = require("express-static-gzip");
const apiRouter = require("./api.js");

// open connectiong to the database
require("../db/connect");

const port = 4000;

const app = express();

app.use(
  "/",
  expressStaticGzip("./dist", {
    enableBrotli: true,
    orderPreference: ["br", "gz"],
    setHeaders: function (res, path) {
      res.setHeader("Cache-Control", "dist, max-age=31536000");
    },
  })
);

app.use(express.json());
app.use(cors());

app.use("/api", apiRouter);

app.get("/:current", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

module.exports = app;
