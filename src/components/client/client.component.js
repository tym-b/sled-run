import React, { PureComponent } from 'react';
import { throttle, map, round } from 'lodash';
import socketio from 'socket.io-client';


export default class Client extends PureComponent {
  state = {
    accelerationFactor: 0,
    velocityFactor: 0,
  };

  componentDidMount() {
    window.addEventListener('devicemotion', this.handleDeviceMotion);
  }

  componentWillUnmount() {
    window.removeEventListener('devicemotion', this.handleDeviceMotion);
  }

  socket = socketio(`${window.location.hostname}:8181`);

  prevPosition = 0;
  prevTime = Date.now();
  prevDelta = 1;
  currPosition = 0;

  logData = throttle(data => this.setState(data), 500);

  recalculatePosition = (acceleration) => {
    const time = Date.now();
    const delta = (time - this.prevTime) / 1000;
    const velocityFactor = (this.currPosition - this.prevPosition) * (delta / this.prevDelta);
    const accelerationFactor = -acceleration.x * (delta + this.prevDelta) * 0.5 * delta;
    const nextPosition = this.currPosition + velocityFactor + accelerationFactor;

    this.logData({ velocityFactor, accelerationFactor, delta });

    this.prevTime = time;
    this.prevDelta = delta;
    this.prevPosition = this.currPosition;
    this.currPosition = nextPosition;
  }

  emitPosition = throttle(() => {
    this.socket.emit('devicemove', { position: this.currPosition });
  }, 100);

  handleDeviceMotion = ({ acceleration }) => {
    this.recalculatePosition(acceleration);
    this.emitPosition();
  };

  render() {
    return (
      <div>
        {map(this.state, (value, key) => (
          <h1>{key}: {round(value, 3)}</h1>
        ))}
      </div>
    );
  }
}
