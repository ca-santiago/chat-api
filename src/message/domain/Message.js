
class Message {

  constructor({ sendTo, sendBy, content, isRead, createdAt, id }) {
    this.sendBy = sendBy;
    this.sendTo = sendTo;
    this.content = content;
    this.isRead = isRead;
    this.createdAt = createdAt;
    this.id = id;
  };

}

module.exports = {
  Message
}