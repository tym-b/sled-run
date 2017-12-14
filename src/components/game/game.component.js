import React, { PureComponent } from 'react';
import socketio from 'socket.io-client';

import Engine from './engine';
import SensorData from './sensorData';

export default class Game extends PureComponent {
  componentDidMount() {
    this.engine = new Engine(this.renderTarget);
    const socket = socketio(`${window.location.hostname}:8181`);
    socket.on('connect', () => {
      socket.emit('gameConnected');
    });
    socket.on('deviceMoveChanged', ({ type, position }) => {
      console.log(type, position);
      SensorData.updateValue(type, position);
    });

    window.addEventListener('resize', this.engine.updateViewport);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.engine.updateViewport);
  }

  handleContainerRef = (ref) => (this.renderTarget = ref);

  render = () => <div ref={this.handleContainerRef} />;
}
