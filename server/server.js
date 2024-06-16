require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/dbConfig.js");
const userRoute = require("./routes/usersRoute.js");

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/users", userRoute);
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  connectDB();
});
