import express from "express";
import {
  renderNewMessageForm,
  createNewMessage,
  deleteMessage,
  viewMessage,
} from "../controllers/messagesController.js";

const router = express.Router();

router.get("/new", renderNewMessageForm);

router.post("/new", createNewMessage);

router.delete("/delete/:id", deleteMessage);

router.get("/:id", viewMessage);

export default router;
