const moment = require("moment");
const { v4 } = require("uuid");
const { right } = require("../../core/Either");
const { validateMessageContent } = require("../domain/Content");
const { Message } = require("../domain/Message");
const { messageMapper } = require("../mapper");
const { MessageMongoRepo } = require("../repo/mongo");

async function CreateMessageUseCase({ accountId, to, content }) {
  const contentOrError = validateMessageContent(content);

  const instance = new Message({
    sendTo: to,
    sendBy: accountId,
    content: contentOrError,
    createdAt: moment().format(),
    isRead: false,
    id: v4(),
  });

  // Save
  MessageMongoRepo.save(instance);
  return right(
    messageMapper.mapToDomain(instance)
  );
}


module.exports = {
  CreateMessageUseCase
}