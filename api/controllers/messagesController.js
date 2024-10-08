import Message from "../models/message.js";

export const renderNewMessageForm = (req, res) => {
  res.render("new");
};

export const createNewMessage = async (req, res) => {
  const { author, message } = req.body;
  const newMessage = new Message({ author, message });
  await newMessage.save();
  res.redirect("/");
};

export const deleteMessage = async (req, res) => {
  await Message.findByIdAndDelete(req.params.id);
  res.status(200).send("Message deleted");
};

export const viewMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).send("Message not found");
    }
    res.render("message", { message });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const renderEditMessageForm = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    res.render("edit", { message });
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
};

// Update message
export const updateMessage = async (req, res) => {
  try {
    const { author, message } = req.body;
    await Message.findByIdAndUpdate(req.params.id, {
      author,
      message,
      editedAt: new Date(),
    });
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
};
