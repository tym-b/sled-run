import { GREEN_PLAYER, RED_PLAYER, GAME, isPlayerType, getTypeById } from '../helpers';

export default class Game {
  constructor(socket) {
    console.log('Game created.');
    this.socket = socket;
    this.socket.on('connection', this.handleClientConnection);
  }

  clients = {
    [GAME]: null,
    [GREEN_PLAYER]: null,
    [RED_PLAYER]: null,
  }

  handleClientConnection = (socket) => {
    const { id } = socket;
    console.log(`Client with id: ${id} connected.`);

    socket.on('disconnect', this.handleClientDisconnection(id));
    socket.on('gameConnected', this.handleGameClientConnection(socket));
    socket.on('playerConnected', this.handlePlayerConnection(socket));
    socket.on('deviceMove', this.handleDeviceMove(id));
    socket.on('playerCollided', this.handlePlayerCollided);
    socket.on('boostUsed', this.handleBoostUsed(id));
    socket.on('syncPlayerBoosts', this.handleSyncPlayerBoosts);
  }

  handleSyncPlayerBoosts = ({ type, boostsLeft }) => {
    console.log(`Sync boosts for player: ${type}, left ${boostsLeft} boosts`);

    this.socket.to(type).emit('syncBoosts', { boostsLeft });
  }

  handleBoostUsed = (id) => () => {
    const type = getTypeById(id, this.clients);
    console.log(`User ${type} used boost`);

    this.socket.to(GAME).emit('playerUsedBoost', { type });
  };

  handleClientDisconnection = (id) => () => {
    console.log(`Client with id: ${id} disconnected.`);

    const type = getTypeById(id, this.clients);

    if (isPlayerType(type)) {
      this.handlePlayerDisconnection(type);
      return;
    }

    if (type === GAME) {
      this.clients[GAME] = null;
    }
  }

  handleGameClientConnection = (socket) => () => {
    const { id } = socket;
    console.log(`Game with id: '${id}' connected.`);

    socket.join(GAME);
    this.clients[GAME] = id;
  };

  handlePlayerConnection = (socket) => ({ type }) => {
    const { id } = socket;
    console.log(`Player '${type}' with id: ${id} connected.`);

    socket.join(type);
    this.clients[type] = id;
    this.socket.to(GAME).emit('playerConnected', { type });
  }

  handlePlayerDisconnection = (type) => {
    console.log(`Player '${type}' disconnected.`);

    this.clients[type] = null;
    this.socket.to(GAME).emit('playerDisconnected', { type });
  }

  handleDeviceMove = (id) => ({ position }) => {
    const type = getTypeById(id, this.clients);
    this.socket.to(GAME).emit('deviceMoveChanged', { position, type });
  }

  handlePlayerCollided = ({ type }) => {
    this.socket.to(type).emit('detectedCollision');
  }
}
