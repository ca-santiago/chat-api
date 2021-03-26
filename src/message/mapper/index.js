const { Message } = require("../domain/Message");

function mapToDomain(rawData) {
  const {
    content, id, createdAt,
    isRead, sendBy, sendTo
  } = rawData;
  const instance = new Message({
    content,
    createdAt,
    id,
    isRead,
    sendBy,
    sendTo
  });
  return instance;
}

function mapToPersistence(message) {
  const {
    content, sendBy, sendTo,
    isRead, id, createdAt
  } = message;
  const output = {
    content,
    createdAt,
    isRead,
    sendTo,
    sendBy,
    _id: id
  }
  return output;
}

function mapToDTO(message) {
  const {
    content, sendBy, sendTo,
    isRead, id, createdAt
  } = message;
  const dto = {
    content,
    createdAt,
    isRead,
    sendTo,
    sendBy,
    _id: id
  }
  return dto;
}

module.exports = {
  messageMapper: {
    mapToDTO,
    mapToPersistence,
    mapToDomain
  }
}
