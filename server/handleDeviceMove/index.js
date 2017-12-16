import { getPlayerTypeById } from '../helpers';

const handleDeviceMove = (io, players, id) => ({ position }) => {
  const type = getPlayerTypeById(players, id);
  io.to('game').emit('deviceMoveChanged', { position, type });
};

module.exports = handleDeviceMove;
