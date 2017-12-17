import React, { PureComponent } from 'react';
import socketio from 'socket.io-client';
import { GREEN_PLAYER, RED_PLAYER } from '../../../server/helpers';

import Engine from './engine';
import SensorData from './sensorData';

export default class Game extends PureComponent {
  state = {
    gameStarted: false,
    [`${GREEN_PLAYER}Connected`]: false,
    [`${RED_PLAYER}Connected`]: false,
  }

  componentDidMount() {
    this.sensorData = new SensorData({ onCollide: this.handlePlayerCollided });

    this.socket.on('connect', this.handleConnect);
    this.socket.on('playerConnected', this.handlePlayerConnected);
    this.socket.on('playerDisconnected', this.handlePlayerDisconnected);
    this.socket.on('deviceMoveChanged', this.sensorData.handleDeviceMoveChanged);

    this.engine = new Engine(this.renderTarget, this.sensorData);
    window.addEventListener('resize', this.engine.updateViewport);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.engine.updateViewport);
  }

  socket = socketio(`${window.location.hostname}:8181`);

  handlePlayerCollided = (type) => this.socket.emit('playerCollided', { type });
  handleConnect = () => this.socket.emit('gameConnected');
  handlePlayerConnected = ({ type }) => this.setState({ [`${type}Connected`]: true });
  handlePlayerDisconnected = ({ type }) => this.setState({ [`${type}Connected`]: false });

  handleContainerRef = (ref) => (this.renderTarget = ref);

  render = () => (
    <div>
      {/*<StartOverlay />*/}
      {/*<FinishedOverlay />*/}
      {/*<WaitingForPlayersOverlay />*/}
      <div ref={this.handleContainerRef} />
    </div>
  );
}
