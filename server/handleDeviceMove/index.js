const constants = require('../helpers');

const handleDeviceMove = (io, players, id) => ({ position }) => {
  const type = constants.getPlayerTypeById(players, id);
  io.to('game').emit('deviceMoveChanged', { position, type });
};

module.exports = handleDeviceMove;
