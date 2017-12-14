const handleDisconnect = require('../handleDisconnect');
const handlePlayerConnected = require('../handlePlayerConnected');

const handleConnection = ({ clients, players }) => (socket) => {
  const { id } = socket;
  clients.push(id);
  console.log(`Client with id: ${id} connected.`);

  socket.on('disconnect', handleDisconnect(clients, players, id));
  socket.on('gameConnected', handleGameConnected(game, id));
  socket.on('playerConnected', handlePlayerConnected(players, id));
};

module.exports = handleConnection;
