import React, { PureComponent } from 'react';
import { map, round, throttle } from 'lodash';
import socketio from 'socket.io-client';

export default class Client extends PureComponent {
  state = {
    position: 0,
  };

  componentDidMount() {
    window.addEventListener('deviceorientation', this.handleOrientation, true);
  }

  componentWillUnmount() {
    window.removeEventListener('deviceorientation', this.handleOrientation, true);
  }

  handleOrientation = ({ beta }) => {
    this.setState({ position: beta });
    this.emitControllerPosition(beta);
  };

  emitControllerPosition = throttle((angle) => {
    this.socket.emit('devicemove', { position: angle });
  }, 50);

  socket = socketio(`${window.location.hostname}:8181`);

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