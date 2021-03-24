
class Message {

  constructor({ sendTo, sendBy, content, users, readState, createdAt }, id) {
    this.sendBy = sendBy;
    this.sendTo = sendTo;
    this.content = content;
    this.readState = readState;
    this.createdAt = createdAt;
    this.id = id;
  };

}

module.exports = {
  Message
}