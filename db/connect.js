const mongoose = require("mongoose");

mongoose
  .connect(process.env.Mongo_URI)
  .then(() => {
    console.log("Db Connected");
  })
  .catch((err) => {
    console.log(err);
  });
