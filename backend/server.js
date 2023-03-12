const { json } = require("express");
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./Routes/UserRoutes");
const pokemonRoutes = require("./Routes/pokemonRoutes");
const { notFound, errorHandler } = require("./Middlewares/errorMiddleware");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
app.use(express.json({ extended: false }));
app.use(express.static("build"));
require("dotenv").config();
dotenv.config();
connectDB();
app.use(express.json());
const PORT = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  "/api/pokeml/classify",
  express.static(path.join(__dirname, "/mod/model.json"))
);
app.use("/api/pokeml", express.static(path.join(__dirname, "/mod")));
app.use("/api/users", userRoutes);
app.use("/api/pokemondata", pokemonRoutes);
__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api is running");
  });
}
app.use(notFound);
app.use(errorHandler);
app.listen(PORT, console.log(`server is listening ${PORT}`));
