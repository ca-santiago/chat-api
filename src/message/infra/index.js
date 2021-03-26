const socket = require("socket.io");
const { VerifyCredentialsUseCase } = require("../../auth/useCases/VerifyCredentials");
const { CreateMessageUseCase } = require("../useCase/CreateMessage");

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
  socket.on('send-message', async (msg, fn) => {
    try {
      const { to, content } = msg;
      if (!content || !to)
        throw new Error('Should provide msg content and user destination id');

      const useCaseResult = await CreateMessageUseCase({ accountId: selfId, content, to: msg.to });

      if (useCaseResult.label == 'left')
        throw new Error(useCaseResult.value);

      io.to(msg.to).emit('message', { ...useCaseResult.value, from: selfId })
      fn(null, true);
    } catch (err) {
      fn('Server error', undefined);
    }
  });
  // TODO Resgister events

  socket.on('delete-mesage', async msg => {
    const { id } = msg;
    io.to(msg.to).emit('delete-msg', { id, from: selfId })
  });

}



module.exports = {
  InitSocketService
}