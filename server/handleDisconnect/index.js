const constants = require('../helpers');

const handleDisconnect = (players, id) => () => {
  const type = constants.getPlayerTypeById(players, id);
  players[type] = null;

  console.log(`Player ${type} disconnected, id: ${id}`);
};

module.exports = handleDisconnect;
