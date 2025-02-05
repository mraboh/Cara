require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/carashop")
  .then((connection) => {
    console.log("connected to mongodb");
    app.use(express.json());
    app.use(cors());
    const authRoute = require("./src/routes/auth");

    app.use("/auth/user", authRoute);

    app.listen(4000, (err) => {
      if (err) throw err;
      console.log("Server running on port 4000");
    });
  })
  .finally((err) => console.log("Server stopped"));
