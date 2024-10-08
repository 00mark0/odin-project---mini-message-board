import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  author: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  editedAt: { type: Date },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
