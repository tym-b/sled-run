import React, { PureComponent } from 'react';
import { throttle } from 'lodash';
import socketio from 'socket.io-client';


export default class Client extends PureComponent {
  componentDidMount() {
    window.addEventListener('devicemotion', this.handleDeviceMotion);
  }

  componentWillUnmount() {
    window.removeEventListener('devicemotion', this.handleDeviceMotion);
  }

  socket = socketio(`${window.location.hostname}:8181`);

  prevPosition = 0;
  prevTime = Date.now();
  currPosition = 0;

  recalculatePosition = (acceleration) => {
    const velocity = (this.currPosition - this.prevPosition);
    const nextPosition = this.currPosition + velocity +
      (-acceleration.x * (((Date.now() - this.prevTime) / 1000) ** 2));

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
    return <div />;
  }
}
