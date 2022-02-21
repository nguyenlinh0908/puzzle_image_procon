require("dotenv").config();
const axios = require("axios");
const https = require("https");
const path = require("path");
const Router = require("./routers/user");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(
  "/vendor",
  express.static(path.join(__dirname, "/node_modules/jquery/dist"))
);
app.use("/public", express.static(path.join(__dirname, "/public")));
app.use("/", Router);
const PORT = process.env.PORT || 5000;
const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log("connect fail" + error);
  }
};
start();