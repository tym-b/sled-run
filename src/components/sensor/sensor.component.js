import React, { PureComponent } from 'react';
import { throttle } from 'lodash';
import { pipe, prop, contains, ifElse, equals } from 'ramda';
import socketio from 'socket.io-client';
import qs from 'query-string';
import classnames from 'classnames';

import { playersTypes } from '../../../server/helpers';
import classes from './sensor.scss';

const logo = require('../../../images/logo.svg');
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
    canBoost: true,
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
    this.socket.on('enableBoost', this.handleEnableBoost);
    this.socket.on('disableBoost', this.handleDisableBoost);
  }

  componentWillUnmount() {
    window.removeEventListener('deviceorientation', this.handleOrientation, true);
  }

  player = pipe(prop('search'), qs.parse, prop('player'))(location);
  canPlay = contains(this.player)(playersTypes);
  prevPosition = 0;

  handleDisconnect = () => this.setState({ status: DISCONNECTED });

  handleDetectedCollision = () => navigator.vibrate([150, 50, 300]);

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
    this.socket.emit('deviceMove', { position: position - this.state.offset });
  }, 30);

  handleOrientation = pipe(prop('beta'), this.handlePositionChange);

  handleCalibrate = () => this.setState(state => ({ offset: state.position }));

  handleEnableBoost = () => this.setState({ canBoost: true });
  handleDisableBoost = () => this.setState({ canBoost: false });

  handleBoost = () => {
    if (this.state.canBoost && !this.state.isBoosting) {
      this.setState({ isBoosting: true });
      this.socket.emit('boostUsed');

      setTimeout(() => {
        this.setState({ isBoosting: false });
        console.log('boostUsed');
      }, 300);
    }
  };

  renderValue = () => ifElse(
    equals(true),
    () => <h1>Position: {this.state.position}</h1>,
    () => <h1>Invalid player type</h1>,
  )(this.canPlay);

  render() {
    return (
      <div className={classes.container}>
        <img alt="" src={logo} className={classes.logo} />

        <div className={classes['player-type']} style={{ background: colors[this.player] }} />

        <button
          className={classnames(
            classes.boost,
            { [classes['boost--disabled']]: !this.state.canBoost },
          )}
          onClick={this.handleBoost}
        >
          Boost mock
        </button>
      </div>
    );
  }
}
