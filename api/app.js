import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import methodOverride from "method-override";

import indexRouter from "./routes/index.js";
import messagesRouter from "./routes/messages.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8800;
const mongoURI = process.env.MONGO;

console.log("Environment Variables:");
console.log("MONGO:", mongoURI);
console.log("PORT:", port);

if (!mongoURI) {
  console.error(
    "MongoDB connection URI is not defined. Please set the MONGO environment variable."
  );
  process.exit(1);
}

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

const connect = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
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
