const { InitSocketService } = require("../message/infra");
const { initMongoConnection } = require("../services/mongodb");

async function StartServices(app, httpServer) {
  try {
    await LoadMogoService();
    await InitSocketService(httpServer);
  } catch (err) {
    console.error(err);
    process.exit();
  }
}

async function LoadMogoService() {
  try {
    console.log("[DB] Starting database conection");
    const urlConnection = process.env.MONGO_URL || `mongodb://localhost:27017/chat-app`;
    await initMongoConnection(urlConnection);
    console.log("[DB] MongoDB connection started");
  } catch (err) {
    console.log("[DB] Could not connect to database");
    console.error(`[DB] ${err.message}`);
  }
}

module.exports = {
  StartServices
}