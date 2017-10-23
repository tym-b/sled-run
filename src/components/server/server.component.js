import React, { PureComponent } from 'react';
import socketio from 'socket.io-client';

import styles from './server.css';


export default class Server extends PureComponent {
  state = {
    position: 0,
  };

  componentDidMount() {
    const socket = socketio(`${window.location.hostname}:8181`);
    socket.on('move', ({ position }) => {
      this.setState({ position });
    });
  }

  render() {
    return <div className={styles.block} style={{ transform: `translateX(${this.state.position}px)` }} />;
  }
}
