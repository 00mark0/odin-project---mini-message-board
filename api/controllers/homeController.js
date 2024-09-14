import Message from "../models/message.js";

export const renderHomePage = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.render("index", { messages });
  } catch (error) {
    res.status(500).send(error);
  }
};
