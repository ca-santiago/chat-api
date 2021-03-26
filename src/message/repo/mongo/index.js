const { messageMapper } = require("../../mapper");
const { MessageModel } = require("./model");

async function save(message) {
  const mapped = messageMapper.mapToPersistence(message);
  const upsetData = { ...mapped };
  await MessageModel.findByIdAndUpdate(message.id, upsetData, {
    upsert: true,
  }).exec();
  return;
}

async function exist(id) {
  return await MessageModel.exists({ _id: id });
}

async function find(id) {
  const exists = await MessageModel.findById(id).exec();
  if (exists) return messageMapper.mapToDomain(exists);
  return null;
}

async function _delete(id) {
  await MessageModel.findByIdAndDelete(id).exec();
  return;
}

async function findPaginated(offset = 0) {
  const exists = await MessageModel.find({})
    .limit(20)
    .skip(offset)
    .sort('createdAt')
    .exec();
  if (exists) {
    return exists.map(item => {
      return messageMapper.mapToDomain(item);
    })
  }
  return null;
}


module.exports = {
  MessageMongoRepo: {
    save,
    delete: _delete,
    find,
    exist,
    findPaginated
  }
}
