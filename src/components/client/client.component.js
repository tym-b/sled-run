import React, { PureComponent } from 'react';
import KalmanFilter from 'kalmanjs';
import { throttle, map, round } from 'lodash';
import socketio from 'socket.io-client';

const ACCELERATION_MOVE_THRESHOLD = 3;
const IGNORE_BACKWARD_ACCELERATION_SAMPLES = 20;

export default class Client extends PureComponent {
  state = {
    position: 0,
  };

  componentDidMount() {
    window.addEventListener('devicemotion', this.handleDeviceMotion);
  }

  componentWillUnmount() {
    window.removeEventListener('devicemotion', this.handleDeviceMotion);
  }

  socket = socketio(`${window.location.hostname}:8181`);
  ignoreCounter = 0;
  currPosition = 0;
  kalman = new KalmanFilter();

  recalculatePosition = (acceleration) => {
    const accFiltered = this.kalman.filter(acceleration.x);

    if (accFiltered > ACCELERATION_MOVE_THRESHOLD && this.ignoreCounter <= 0) {
      this.ignoreCounter = IGNORE_BACKWARD_ACCELERATION_SAMPLES;
      this.currPosition -= 1;
    }

    if (accFiltered < -ACCELERATION_MOVE_THRESHOLD && this.ignoreCounter <= 0) {
      this.ignoreCounter = IGNORE_BACKWARD_ACCELERATION_SAMPLES;
      this.currPosition += 1;
    }

    this.ignoreCounter -= 1;
  }

  emitPosition = throttle(() => {
    this.setState({ position: this.currPosition });
    this.socket.emit('devicemove', { position: this.currPosition });
  }, 50);

  handleDeviceMotion = ({ acceleration }) => {
    this.recalculatePosition(acceleration);
    this.emitPosition();
  };

  render() {
    return (
      <div>
        {map(this.state, (value, key) => (
          <h1 key={key}>{key}: {round(value, 3)}</h1>
        ))}
      </div>
    );
  }
}
