import { getPlayerTypeById } from '../helpers';

const handleDisconnect = (players, id) => () => {
  const type = getPlayerTypeById(players, id);
  players[type] = null;

  console.log(`Player ${type} disconnected, id: ${id}`);
};

module.exports = handleDisconnect;
