if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const indexRouter = require("./routes/index");
const mongoose = require("mongoose");
const authorRouter = require("./routes/author");
const expressLayouts = require("express-ejs-layouts");
// const { applyEachSeries } = require("async");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

app.set("view engine", "ejs");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.set(express.static("public"));

app.use(express.urlencoded({ extended: false }));
app.use("/", indexRouter);
// app.get("/", (req, res) => {
//   res.render("beast");
// });
app.use("/authors", authorRouter);

app.listen(process.env.PORT || 3000);
