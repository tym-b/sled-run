const { contains, __, propEq, always, cond } = require('ramda');

export const GAME = 'game';
export const RED_PLAYER = 'red';
export const GREEN_PLAYER = 'green';
export const playersTypes = [GREEN_PLAYER, RED_PLAYER];

export const isPlayerType = contains(__, playersTypes);
export const getTypeById = (id, object) => cond([
  [propEq(GREEN_PLAYER, id), always(GREEN_PLAYER)],
  [propEq(RED_PLAYER, id), always(RED_PLAYER)],
  [propEq(GAME, id), always(GAME)],
])(object)