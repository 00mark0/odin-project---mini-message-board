import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";

import indexRouter from "./routes/index.js";
import messagesRouter from "./routes/messages.js"; // Ensure this path is correct

dotenv.config();

const app = express();
const port = process.env.PORT || 8800;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});

app.use("/", indexRouter);
app.use("/messages", messagesRouter);

app.listen(port, () => {
  connect();
  console.log(`Server running at http://localhost:${port}`);
});
