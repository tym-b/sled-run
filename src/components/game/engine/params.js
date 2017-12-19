import { GUI } from 'dat.gui/build/dat.gui';

const params = {
  SENSOR_POWER: 2,
  SENSOR_MULTIPLIER: 0.00035,
  TILT_MULTIPLIER: 1,
  CAMERA_TILT_MULTIPLIER: 5,
  INITIAL_SPEED: 500,
  BOOSTED_SPEED: 900,
  BOOSTED_SPEED_INTERVAL: 1500,
  REDUCED_SPEED: 100,
  REDUCED_SPEED_INTERVAL: 500,
};

export default params;

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
