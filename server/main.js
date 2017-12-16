const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const constants = require('./helpers');
const handleConnection = require('./handleConnection');

const app = express();
const server = http.Server(app);
const io = socketIO(server);
const port = process.env.PORT ? process.env.PORT : 8181;

const players = {
  [constants.GREEN_PLAYER]: null,
  [constants.RED_PLAYER]: null,
};

const game = {
  clientId: null,
};

server.listen(port, () => { console.log(`Server is listening on port ${port}`); });

app.get('/', (req, res) => res.sendfile(path.join(__dirname, '/index.html')));

io.on('connection', handleConnection({ io, players, game }));
