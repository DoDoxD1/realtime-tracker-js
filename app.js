//imports
require('dotenv').config();
const express = require('express');
const socket = require('socket.io');
const http = require('http');
const path = require('path');

//port
const port = process.env.PORT || 3000;
//deaults
const app = express();
const server = http.createServer(app);
const io = socket(server);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  socket.on('send-location', (data) => {
    io.emit('receive-location', { id: socket.id, ...data });
  });
  socket.on('disconnect', (id) => {
    io.emit('user-disconnected', socket.id);
  });
});

//server
app.get('/', (req, res) => {
  res.render('index');
});

server.listen(port, () => {
  console.log(`App listenting on port: ${port}`);
});
