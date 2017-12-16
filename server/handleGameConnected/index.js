const handleGameConnected = (socket, game, id) => () => {
  game.clientId = id;
  socket.join('game');
  console.log(`Game client connected with id: ${id}`);
};

export default handleGameConnected;
