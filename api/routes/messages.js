import express from "express";
import {
  renderNewMessageForm,
  createNewMessage,
  deleteMessage,
  viewMessage,
  renderEditMessageForm,
  updateMessage,
} from "../controllers/messagesController.js";

const router = express.Router();

router.get("/new", renderNewMessageForm);

router.post("/new", createNewMessage);

router.delete("/delete/:id", deleteMessage);

router.get("/:id", viewMessage);

router.get("/:id/edit", renderEditMessageForm);

router.post("/:id/edit", updateMessage);

export default router;
