const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const notesRoutes = require("./routes/notesRoutes");
const authRoutes = require("./routes/authRoutes");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const app = express();

app.use(cors());
app.use(express.json());

const DB = process.env.DATABASE;

mongoose.connect(DB, () => {
  console.log("Database connection successfully done!");
});

app.get("/", (req, res) => {
  res.json("Server started");
});

app.use("/api/notes", notesRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is running on the port ${PORT}`);
});
