const { always, propEq, ifElse } = require('ramda');
const constants = require('../constants');

const handleDisconnect = (clients, players, id) => () => {
  const index = clients.indexOf(id);
  const type = ifElse(
    propEq(constants.GREEN_PLAYER, id),
    always(constants.GREEN_PLAYER),
    always(constants.RED_PLAYER)
  )(players);

  players[type] = null;
  clients.splice(index, 1);

  console.log(`Player ${type} disconnected, id: ${id}`);
};

module.exports = handleDisconnect;
