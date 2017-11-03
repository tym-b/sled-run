import React, { PureComponent } from 'react';
import { map, round, throttle } from 'lodash';
import { pipe, prop } from 'ramda';
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

  prevPosition = 0;

  handlePositionChange = (position) => {
    if (this.prevPosition !== position) {
      this.emitPosition(position);
    }
  }

  emitPosition = throttle((position) => {
    this.setState({ position });
    this.socket.emit('devicemove', { position });
  }, 30);

  handleOrientation = pipe(prop('beta'), Math.round, this.handlePositionChange);

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
