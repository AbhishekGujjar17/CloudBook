import express from "express";
import bodyParser from "body-parser";
import { connect } from "mongoose";
import cors from "cors";
import notesRoutes from "./routes/notesRoutes";
import authRoutes from "./routes/authRoutes";
import { config } from "dotenv";
import { Request, Response } from "express";
config({ path: "./.env" });

const app = express();

app.use(cors());
app.use(bodyParser.json());

const DB: string | undefined = process.env.DATABASE;

connect(DB!, () => {
  console.log("Database connection successfully done!");
});

app.get("/", (req: Request, res: Response) => {
  res.json("Server started");
});

app.use("/api/notes", notesRoutes);
app.use("/api/auth", authRoutes);

const PORT: string | number = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is running on the port ${PORT}`);
});
