const handleDisconnect = require('../handleDisconnect');
const handlePlayerConnected = require('../handlePlayerConnected');
const handleGameConnected = require('../handleGameConnected');
const handleDeviceMove = require('../handleDeviceMove');

const handleConnection = ({ io, players, game }) => (socket) => {
  const { id } = socket;
  console.log(`Client with id: ${id} connected.`);

  socket.on('disconnect', handleDisconnect(players, id));
  socket.on('gameConnected', handleGameConnected(socket, game, id));
  socket.on('playerConnected', handlePlayerConnected(players, id));
  socket.on('deviceMove', handleDeviceMove(io, players, id));
};

module.exports = handleConnection;
