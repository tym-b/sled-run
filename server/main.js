import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import path from 'path';

import Game from './game';

const app = express();
const server = http.Server(app);
const io = socketIO(server);
const port = process.env.PORT ? process.env.PORT : 8181;
const dist = path.join(__dirname, '../dist');

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
  return new Game(io);
});

app.use(express.static(dist));
app.get('*', (req, res) => res.sendfile(path.join(__dirname, '../dist/index.html')));
