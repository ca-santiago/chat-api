const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  _id: String,
  sendTo: String,
  sendBy: String,
  createdAt: String,
  content: String,
  isRead: Boolean,
});

const MessageModel = mongoose.model("Message", MessageSchema);
module.exports = {
  MessageModel
}

