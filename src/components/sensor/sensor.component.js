import React, { PureComponent } from 'react';
import { throttle, clamp } from 'lodash';
import { pipe, prop, contains } from 'ramda';
import socketio from 'socket.io-client';
import qs from 'query-string';
import classNames from 'classnames';

import { playersTypes } from '../../../server/helpers';
import params from '../game/engine/params';
import classes from './sensor.scss';

const CONNECTING = 'connecting';
const CONNECTED = 'connected';
const DISCONNECTED = 'disconnected';
const colors = {
  red: '#e53935',
  green: '#00b971',
};

export default class Sensor extends PureComponent {
  state = {
    position: 0,
    offset: 0,
    status: CONNECTING,
    error: '',
    isBoosting: false,
    boostsLeft: params.INITIAL_NITROS,
  };

  componentDidMount() {
    if (!this.canPlay) {
      return;
    }

    window.addEventListener('deviceorientation', this.handleOrientation, true);
    this.socket = socketio(`${window.location.hostname}:8181`);
    this.socket.on('connect', this.handleConnect);
    this.socket.on('disconnect', this.handleDisconnect);
    this.socket.on('detectedCollision', this.handleDetectedCollision);
    this.socket.on('syncBoosts', this.handleSyncBoosts);
  }

  componentWillUnmount() {
    window.removeEventListener('deviceorientation', this.handleOrientation, true);
  }

  player = pipe(prop('search'), qs.parse, prop('player'))(location);
  canPlay = contains(this.player)(playersTypes);
  prevPosition = 0;

  handleDisconnect = () => this.setState({ status: DISCONNECTED });

  handleDetectedCollision = () => {};

  handleConnect = () => {
    this.setState({ status: CONNECTED });
    this.socket.emit('playerConnected', { type: this.player });
  }

  handlePositionChange = (position) => {
    if (this.prevPosition !== position) {
      this.emitPosition(position);
    }
  }

  get position() {
    return this.state.position - this.state.offset;
  }

  emitPosition = throttle((position) => {
    this.setState({ position });
    this.socket.emit('deviceMove', { position: this.position });
  }, 30);

  handleOrientation = pipe(prop('beta'), this.handlePositionChange);

  handleCalibrate = () => this.setState(state => ({ offset: state.position }));

  handleSyncBoosts = ({ boostsLeft }) => this.setState({ boostsLeft });

  handleBoost = () => {
    if (this.state.boostsLeft > 0 && !this.state.isBoosting) {
      this.setState({ isBoosting: true });
      this.socket.emit('boostUsed');
      setTimeout(() => this.setState({ isBoosting: false }), 1000);
    }
  };

  render() {
    return (
      <div className={classes.container}>
        <div className={classes.boostsContainer}>
          <div
            className={classNames(classes.boost, { [classes.boostActive]: this.state.boostsLeft > 0 })}
            onClick={this.handleBoost}
          />
        </div>
        <div className={classes.playerType} style={{ background: colors[this.player] }}>
          <div
            className={classes.pointerLeft}
            style={{ transform: `scaleY(${clamp(this.position, -10, 0) * -0.1})` }}
          />
          <div
            className={classes.pointerRight}
            style={{ transform: `scaleY(${clamp(this.position, 0, 10) * 0.1})` }}
          />
          <button className={classes.calibrateButton} onClick={this.handleCalibrate}>
            calibrate
          </button>
        </div>
      </div>
    );
  }
}
