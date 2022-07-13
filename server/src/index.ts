import express from "express";

import cors from "cors";
import { config } from "dotenv";

config();

import { userRoutes } from "./routes/user";
import { todoRoutes } from "./routes/todo";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 4000;

const dbConnectionUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0ktpm.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(dbConnectionUrl, {
  //@ts-ignore
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

app.listen(PORT, () => {
  console.log("Running server on port: " + PORT);
});
