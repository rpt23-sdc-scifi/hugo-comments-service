const mongoose = require("mongoose");

const database = "soundcloud";

mongoose.connect(`mongodb://localhost/${database}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
  console.log(`mongodb connected to database "${database}"!`);
});

const dropDatabase = async () => {
  await db.dropDatabase();
  console.log(`database "${database}" dropped`);
};

const dropCollection = async () => {
  await db.dropCollection("comments");
  console.log("comments collection dropped");
};

module.exports = {
  dropDatabase,
  dropCollection,
};
