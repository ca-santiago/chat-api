const mongoose = require("mongoose");

async function initMongoConnection(url) {
  const con = await mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    bufferCommands: false,
  })
  return con;
}

module.exports = {
  initMongoConnection
}