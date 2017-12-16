const { propEq, always, ifElse } = require('ramda');

export const RED_PLAYER = 'red';
export const GREEN_PLAYER = 'green';
export const playersTypes = [GREEN_PLAYER, RED_PLAYER];
export const getPlayerTypeById = (players, id) => ifElse(
  propEq(GREEN_PLAYER, id),
  always(GREEN_PLAYER),
  always(RED_PLAYER)
)(players);
