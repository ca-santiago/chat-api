const express = require('express');
const { v4 } = require('uuid');
const http = require('http');

const app = express();
const server = http.Server(app);
const io = require('socket.io')(server);


app.set('view engine', 'ejs');
app.use(express.static('./public'));


app.get('/', (req, res) => {
  res.redirect(`/${v4()}`);
})

app.get('/:id', (req, res) => {
  res.render('room', { roomId: req.params.id })
})

io.on('disconnection', ()=> {
  console.log('Socket disconected')
})

io.on('connection', (socket) => {
  console.log('Connection')

  // TODO Rename this to: room conections request, and pass credentials.
  socket.on('join-room', (roomId, userId) => {
    console.log('Joined to the room  ' + roomId, userId)
    socket.join(roomId);
    socket.to(roomId).emit('user-connected', userId);

    socket.on('disconnect', () => {
      socket.to(roomId).emit('user-disconnected', userId);
    });

    socket.on('message', (data) => {
      io.in(roomId).emit('chat-message', data, userId);
    });

  });

  socket.on('session', (roomId) => {
    socket.join(roomId)
    console.log('Session started for: ', userId)
  });
});



server.listen(3000, err => {
  if (err) {
    console.error(err);
    process.exit();
  }
  console.log('Working')
})
