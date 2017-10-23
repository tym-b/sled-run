import socketio from 'socket.io';
import path from 'path';
import express from 'express';

const app = express();

const port = process.env.PORT ? process.env.PORT : 8181;
const dist = path.join(__dirname, 'dist');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.static(dist));

app.get('*', (req, res) => {
  res.sendFile(path.join(dist, 'index.html'));
});

const server = app.listen(port, (error) => {
  if (error) {
    console.log(error); // eslint-disable-line no-console
  }
  console.info('Express is listening on port %s.', port); // eslint-disable-line no-console
});

const io = socketio(server, { origins: '*:*' });

io.on('connection', (socket) => {
  socket.on('devicemove', ({ position }) => {
    io.emit('move', { position });
  });
});
