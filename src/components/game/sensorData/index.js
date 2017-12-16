import socketio from 'socket.io-client';
import { GREEN_PLAYER, RED_PLAYER } from '../../../../server/helpers';

export default class SensorData {
  sensors = {
    [GREEN_PLAYER]: 0,
    [RED_PLAYER]: 0,
  };

  socket = socketio(`${window.location.hostname}:8181`);

  constructor() {
    this.socket.on('connect', () => {
      this.socket.emit('gameConnected');
    });

    this.socket.on('deviceMoveChanged', ({ type, position }) => {
      this.sensors[type] = position;
    });

    window.addEventListener('keydown', ({ key }) => {
      switch (key) {
        case 'ArrowLeft':
          this.sensors[RED_PLAYER] = 5;
          break;
        case 'ArrowRight':
          this.sensors[RED_PLAYER] = -5;
          break;
        case 'a':
          this.sensors[GREEN_PLAYER] = 5;
          break;
        case 'd':
          this.sensors[GREEN_PLAYER] = -5;
          break;
        default:
      }
    });

    window.addEventListener('keyup', ({ key }) => {
      if (key === 'ArrowLeft' || key === 'ArrowRight') {
        this.sensors[RED_PLAYER] = 0;
      } else if (key === 'a' || key === 'd') {
        this.sensors[GREEN_PLAYER] = 0;
      }
    });
  }

  sendPlayerCollideEvent = (type) => this.socket.emit('playerCollided', { type });

  getValue = (sensor = GREEN_PLAYER) => this.sensors[sensor];
}
