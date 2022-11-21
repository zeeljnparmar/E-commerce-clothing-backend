//Environment variables
const env = process.env.NODE_ENV || "dev";
if (env == "dev") {
  require("dotenv").config();
}

//dependencies
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
//routes
const userRoutes = require("./routes/user.routes");
const routes = require("./routes");

//Database Connectivities
mongoose
  .connect(process.env.DBMS)
  .then(() => {
    console.log("DataBase Connected...");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//Cors cross origin resource sharing
app.use(cors());

//Api Calls
app.use("/api", routes);
app.use("/api/user", userRoutes);
app.get("/", (req, res) => {
  res.send("welcome to ec backend");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
