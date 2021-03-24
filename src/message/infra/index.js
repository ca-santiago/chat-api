const socket = require("socket.io");
const { VerifyCredentialsUseCase } = require("../../auth/useCases/VerifyCredentials");

function InitSocketService(httpServer) {
  const io = socket(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', async (socket) => {
    try {
      const { token, refreshToken } = socket.handshake?.auth;
      const res = await VerifyCredentialsUseCase({ token, refreshToken });
      if (res.label == 'left') return socket.disconnect();

      // Room joining
      const credentials = res.value;
      socket.join(credentials.accountId);
      // console.log("jooining to the room: ")
      // console.log(credentials.accountId)

      // Event registry
      registerListeners(socket, io, credentials.accountId);
    } catch (err) {
      console.log(err);
      socket.emit('connection-error');
      socket.disconnect();
    }
  });
}

function registerListeners(socket, io, selfId) {
  socket.on('send-message', async (msg) => {
    io.to(msg.to).emit('message', { ...msg, from: selfId })
  });
  // TODO Resgister events
}



module.exports = {
  InitSocketService
}