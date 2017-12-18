import TWEEN from 'tween.js';

import Physics from './physics';
import Engine3D from './3d';
import Audio from './audio';

import createTrack, {
  TRACK_SEGMENT_START,
  TRACK_SEGMENT_STRAIGHT,
  TRACK_SEGMENT_LEFT,
  TRACK_SEGMENT_RIGHT,
  TRACK_SEGMENT_END,
} from './track';

const TRACK = [
  TRACK_SEGMENT_START,
  TRACK_SEGMENT_STRAIGHT,
  TRACK_SEGMENT_STRAIGHT,
  TRACK_SEGMENT_LEFT,
  TRACK_SEGMENT_STRAIGHT,
  TRACK_SEGMENT_STRAIGHT,
  TRACK_SEGMENT_STRAIGHT,
  TRACK_SEGMENT_RIGHT,
  TRACK_SEGMENT_STRAIGHT,
  TRACK_SEGMENT_STRAIGHT,
  TRACK_SEGMENT_END,
];

export default class Engine {
  constructor(renderTarget, sensorData, onFinish) {
    this.track = createTrack(TRACK);

    this.onFinish = onFinish;

    this.audio = new Audio();
    this.audio.load();

    this.sensorData = sensorData;
    this.renderTarget = renderTarget;
  }

  load() {
    return this.reset();
  }

  start() {
    clearTimeout(this.startTimeout);

    this.audio.sounds.counting.play();

    this.startTimeout = setTimeout(() => {
      this.physics.start();
      this.audio.sounds.background.play();
    }, 4000);
  }

  reset() {
    return new Promise((resolve) => {
      cancelAnimationFrame(this.rafNr);
      this.physics = new Physics(this.track, this.sensorData, this.audio);
      this.physics.onFinish = this.onFinish;
      this.engine3d = new Engine3D(this.renderTarget, this.physics, this.track);
      this.engine3d.load().then(this.init).then(resolve);
    });
  }

  updateViewport = () => {
    this.engine3d.updateViewport();
  };

  loop = (time) => {
    this.rafNr = requestAnimationFrame(this.loop);

    TWEEN.update(time);

    this.physics.update(time);
    this.engine3d.render(time);
  };

  init = () => {
    this.rafNr = requestAnimationFrame(this.loop);
  };
}
