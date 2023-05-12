// Required Files
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB Connnected");
  })
  .catch((err) => {
    console.log(err, "Error Occured Connecting To DB");
  });
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("", require("./routes/todo"));

// Run Server
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3002;
}
app.listen(port, function () {
  console.log("running on port 3002");
});
