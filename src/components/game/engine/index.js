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
  TRACK_SEGMENT_STRAIGHT,
  TRACK_SEGMENT_STRAIGHT,
  TRACK_SEGMENT_STRAIGHT,
  TRACK_SEGMENT_STRAIGHT,
  TRACK_SEGMENT_STRAIGHT,
  TRACK_SEGMENT_END,
];

export default class Engine {
  constructor(renderTarget, sensorData) {
    const track = createTrack(TRACK);

    this.audio = new Audio();
    this.audio.load();
    this.physics = new Physics(track, sensorData, this.audio);
    this.engine3d = new Engine3D(renderTarget, this.physics, track);
    this.engine3d.load().then(this.init);
  }

  updateViewport = () => {
    this.engine3d.updateViewport();
  };

  loop = (time) => {
    requestAnimationFrame(this.loop);

    TWEEN.update(time);

    this.physics.update(time);
    this.engine3d.render(time);
  };

  init = () => {
    requestAnimationFrame(this.loop);
  };
}
