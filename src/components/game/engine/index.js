import TWEEN from 'tween.js';
import { GUI } from 'dat.gui/build/dat.gui';

import Physics from './physics';
import Engine3D from './3d';
import Audio from './audio';
import params from './params';

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
  TRACK_SEGMENT_RIGHT,
  TRACK_SEGMENT_STRAIGHT,
  TRACK_SEGMENT_STRAIGHT,
  TRACK_SEGMENT_RIGHT,
  TRACK_SEGMENT_LEFT,
  TRACK_SEGMENT_STRAIGHT,
  TRACK_SEGMENT_STRAIGHT,
  TRACK_SEGMENT_STRAIGHT,
  TRACK_SEGMENT_LEFT,
  TRACK_SEGMENT_STRAIGHT,
  TRACK_SEGMENT_STRAIGHT,
  TRACK_SEGMENT_RIGHT,
  TRACK_SEGMENT_STRAIGHT,
  TRACK_SEGMENT_STRAIGHT,
  TRACK_SEGMENT_END,
];

function enableDAT() {
  const gui = new GUI();

  gui.add(params, 'SENSOR_POWER', 1, 3);
  gui.add(params, 'SENSOR_MULTIPLIER', 0.0001, 0.001);
  gui.add(params, 'TILT_MULTIPLIER', 0.1, 2);
  gui.add(params, 'CAMERA_TILT_MULTIPLIER', -15, 15);
  gui.add(params, 'INITIAL_SPEED', 0, 1000);
  gui.add(params, 'BOOSTED_SPEED', 0, 2000);
  gui.add(params, 'BOOSTED_SPEED_INTERVAL', 0, 5000);
  gui.add(params, 'BOOSTED_SPEED', 0, 1000);
  gui.add(params, 'REDUCED_SPEED_INTERVAL', 0, 5000);
}

export default class Engine {
  constructor(renderTarget, sensorData, onFinish, onBoostCollect) {
    this.track = createTrack(TRACK);

    this.audio = new Audio();

    this.sensorData = sensorData;
    this.renderTarget = renderTarget;

    this.onFinish = onFinish;
    this.onBoostCollect = onBoostCollect;
    this.setupPhysics();

    this.engine3d = new Engine3D(this.renderTarget, this.physics, this.track);
    // enableDAT();
  }

  setupPhysics() {
    this.physics = new Physics(this.track, this.sensorData, this.audio);
    this.physics.onFinish = this.onFinish;
    this.physics.onBoostCollect = this.onBoostCollect;
  }

  async load() {
    await this.audio.load();
    await this.engine3d.load();
    this.init();
  }

  useBoost(type) {
    return this.physics.useBoost(type);
  }

  start() {
    this.physics.start();
    this.audio.sounds.background.play();
  }

  playCounter() {
    this.audio.sounds.counting.play();
  }

  async reset() {
    cancelAnimationFrame(this.rafNr);
    this.setupPhysics();
    await this.engine3d.reset();
    this.engine3d.setPhysics(this.physics);
    this.init();
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
