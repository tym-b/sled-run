const { propEq, always, ifElse } = require('ramda');
const RED_PLAYER = 'red';
const GREEN_PLAYER = 'green';
const getPlayerTypeById = (players, id) => ifElse(
  propEq(GREEN_PLAYER, id),
  always(GREEN_PLAYER),
  always(RED_PLAYER)
)(players);

module.exports = {
  RED_PLAYER,
  GREEN_PLAYER,
  getPlayerTypeById,
};
