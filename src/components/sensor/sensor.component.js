import React, { PureComponent } from 'react';
import { throttle } from 'lodash';
import { pipe, prop, contains, ifElse, equals } from 'ramda';
import socketio from 'socket.io-client';
import qs from 'query-string';

const PLAYER_GREEN = 'green';
const PLAYER_RED = 'red';
const playersTypes = [PLAYER_GREEN, PLAYER_RED];
const CONNECTING = 'connecting';
const CONNECTED = 'connected';
const DISCONNECTED = 'disconnected';

export default class Sensor extends PureComponent {
  state = {
    position: 0,
    status: CONNECTING,
    error: '',
  };

  componentDidMount() {
    if (!this.canPlay) {
      return;
    }

    window.addEventListener('deviceorientation', this.handleOrientation, true);
    this.socket = socketio(`${window.location.hostname}:8181`);
    this.socket.on('connect', this.handleConnect);
    this.socket.on('disconnect', this.handleDisconnect);
  }

  componentWillUnmount() {
    window.removeEventListener('deviceorientation', this.handleOrientation, true);
  }

  player = pipe(prop('search'), qs.parse, prop('player'))(location);
  canPlay = contains(this.player)(playersTypes);
  prevPosition = 0;

  handleDisconnect = () => this.setState({ status: DISCONNECTED });

  handleConnect = () => {
    this.setState({ status: CONNECTED });
    this.socket.emit('playerConnected', { type: this.player });
  }

  handlePositionChange = (position) => {
    if (this.prevPosition !== position) {
      this.emitPosition(position);
    }
  }

  emitPosition = throttle((position) => {
    this.setState({ position });
    this.socket.emit('deviceMove', { position });
  }, 30);

  handleOrientation = pipe(prop('beta'), Math.round, this.handlePositionChange);

  renderValue = () => ifElse(
    equals(true),
    () => <h1>Position: {this.state.position}</h1>,
    () => <h1>Invalid player type</h1>,
  )(this.canPlay);

  render() {
    return (
      <div style={{ background: this.player }}>
        {this.renderValue()}

        <h2>Status: {this.state.status}</h2>
        <h2>Error: {this.state.error}</h2>
      </div>
    );
  }
}
