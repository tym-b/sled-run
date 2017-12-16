import handleDisconnect from '../handleDisconnect';
import handlePlayerConnected from '../handlePlayerConnected';
import handleGameConnected from '../handleGameConnected';
import handleDeviceMove from '../handleDeviceMove';
import handlePlayerCollided from '../handlePlayerCollided';

const handleConnection = ({ io, players, game }) => (socket) => {
  const { id } = socket;
  console.log(`Client with id: ${id} connected.`);

  socket.on('disconnect', handleDisconnect(players, id));
  socket.on('gameConnected', handleGameConnected(socket, game, id));
  socket.on('playerConnected', handlePlayerConnected(socket, players, id));
  socket.on('deviceMove', handleDeviceMove(io, players, id));
  socket.on('playerCollided', handlePlayerCollided(io));
};

export default handleConnection;
