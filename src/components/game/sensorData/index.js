import socketio from 'socket.io-client';
import { PLAYER_GREEN, PLAYER_RED } from '../../../../server/helpers';


export default class SensorData {
  sensors = {
    [PLAYER_GREEN]: 0,
    [PLAYER_RED]: 0,
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
          this.sensors[PLAYER_GREEN] = 5;
          break;
        case 'ArrowRight':
          this.sensors[PLAYER_GREEN] = -5;
          break;
        case 'a':
          this.sensors[PLAYER_RED] = 5;
          break;
        case 'd':
          this.sensors[PLAYER_RED] = -5;
          break;
        default:
      }
    });

    window.addEventListener('keyup', ({ key }) => {
      clearTimeout(this.keyboardTimeout);

      if (key === 'ArrowLeft' || key === 'ArrowRight') {
        this.sensors[PLAYER_GREEN] = 0;
      } else if (key === 'a' || key === 'd') {
        this.sensors[PLAYER_RED] = 0;
      }
    });
  }

  getValue = (sensor = PLAYER_GREEN) => this.sensors[sensor];
}
