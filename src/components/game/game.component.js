import React, { PureComponent } from 'react';
import socketio from 'socket.io-client';
import { propEq, anyPass, allPass } from 'ramda';
import { GREEN_PLAYER, RED_PLAYER } from '../../../server/helpers';
import WaitingForPlayers from '../waitingForPlayers/waitingForPlayers.component';
import Start from '../start/start.component';
import Finish from '../finish/finish.component';

import Engine from './engine';
import SensorData from './sensorData';

export default class Game extends PureComponent {
  state = {
    winner: null,
    finished: false,
    gameLoaded: false,
    gameStarted: false,
    [`${GREEN_PLAYER}Connected`]: false,
    [`${RED_PLAYER}Connected`]: false,
  }

  componentDidMount() {
    this.sensorData = new SensorData({ onCollide: this.handlePlayerCollided });

    this.socket.on('connect', this.handleConnect);
    this.socket.on('playerConnected', this.handlePlayerConnected);
    this.socket.on('playerDisconnected', this.handlePlayerDisconnected);
    this.socket.on('deviceMoveChanged', this.handleDeviceMoveChanged);

    this.engine = new Engine(this.renderTarget, this.sensorData, (winner) => {
      if (!this.state.finished) {
        this.setState({ finished: true, winner });
      }
    });

    window.addEventListener('resize', this.engine.updateViewport);

    this.engine.load().then(() => this.setState({ gameLoaded: true }));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.engine.updateViewport);
  }

  engine = {};

  start = () => {
    this.setState({ winner: null });
    this.engine.start();
  }

  reset = () => {
    this.setState({ finished: false, gameLoaded: false });
    this.engine.reset().then(() => this.setState({ gameLoaded: true }));
  }

  socket = socketio(`${window.location.hostname}:8181`);

  handlePlayerCollided = (type) => this.socket.emit('playerCollided', { type });
  handleConnect = () => this.socket.emit('gameConnected');
  handlePlayerConnected = ({ type }) => this.setState({ [`${type}Connected`]: true });
  handlePlayerDisconnected = ({ type }) => this.setState({ [`${type}Connected`]: false });
  handleDeviceMoveChanged = (data) => {
    const { type } = data;
    const stateProp = `${type}Connected`;

    if (this.state[stateProp] === false) {
      this.setState({ [stateProp]: true });
    }

    this.sensorData.handleDeviceMoveChanged(data);
  }

  handleContainerRef = (ref) => (this.renderTarget = ref);

  isWaitingForPlayers = () => anyPass([
    propEq(`${GREEN_PLAYER}Connected`, false),
    propEq(`${RED_PLAYER}Connected`, false),
  ])(this.state);

  canStartGame = () => allPass([
    propEq('gameLoaded', true),
    propEq('finished', false),
    () => !this.isWaitingForPlayers(),
  ])(this.state)

  render = () => (
    <div>
      <WaitingForPlayers isVisible={this.isWaitingForPlayers()} gameLoaded={this.state.gameLoaded} />
      <Start
        isVisible={this.canStartGame()}
        onStartClick={() => this.engine.playCounter()}
        onCounterFinish={this.start}
      />
      <Finish isVisible={this.state.finished} onRestartClick={this.reset} player={this.state.winner} />
      <div ref={this.handleContainerRef} />
    </div>
  );
}
