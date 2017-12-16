import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import path from 'path';

import { GREEN_PLAYER, RED_PLAYER } from './helpers';
import handleConnection from './handleConnection';

const app = express();
const server = http.Server(app);
const io = socketIO(server);
const port = process.env.PORT ? process.env.PORT : 8181;

const players = {
  [GREEN_PLAYER]: null,
  [RED_PLAYER]: null,
};

const game = {
  clientId: null,
};

server.listen(port, () => { console.log(`Server is listening on port ${port}`); });

app.get('/', (req, res) => res.sendfile(path.join(__dirname, '/index.html')));

io.on('connection', handleConnection({ io, players, game }));
