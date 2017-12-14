const handlePlayerConnected = (players, id) => ({ type }) => {
  console.log(`Player ${type} connected with id: ${id}`);
  players[type] = id;
};

module.exports = handlePlayerConnected;
