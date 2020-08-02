if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const indexRouter = require("./routes/index");
const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

app.set("view engine", "ejs");
app.set(express.static("public"));

app.use("/", indexRouter);
// app.get("/", (req, res) => {
//   res.render("beast");
// });

app.listen(process.env.PORT || 3000);