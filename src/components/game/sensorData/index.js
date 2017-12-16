import socketio from 'socket.io-client';
import { GREEN_PLAYER, RED_PLAYER } from '../../../../server/helpers';


export default class SensorData {
  sensors = {
    [GREEN_PLAYER]: 0,
    [RED_PLAYER]: 0,
  };

  constructor() {
    const socket = socketio(`${window.location.hostname}:8181`);

    socket.on('connect', () => {
      socket.emit('gameConnected');
    });

    socket.on('deviceMoveChanged', ({ type, position }) => {
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
      clearTimeout(this.keyboardTimeout);

      if (key === 'ArrowLeft' || key === 'ArrowRight') {
        this.sensors[RED_PLAYER] = 0;
      } else if (key === 'a' || key === 'd') {
        this.sensors[GREEN_PLAYER] = 0;
      }
    });
  }

  getValue = (sensor = GREEN_PLAYER) => this.sensors[sensor];
}
