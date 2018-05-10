// *********** INSTANTIATE EXPRESS *************
const express = require('express');
const app = express();
const http = require('http').Server(app);

// ***************** ROUTES *******************
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

http.listen(3000);

// *************** SOCKET.IO *****************

const io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('a user is connected');

  socket.on('new_message', (data) => {
    io.sockets.emit('new_message', {
      message: data.message
    });
  });

});
