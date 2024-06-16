require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/dbConfig.js");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

startServer();
