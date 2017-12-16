const handlePlayerConnected = (socket, players, id) => ({ type }) => {
  console.log(`Player ${type} connected with id: ${id}`);
  socket.join(type);
  players[type] = id;
};

export default handlePlayerConnected;
