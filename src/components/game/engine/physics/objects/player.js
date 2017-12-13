import * as CANNON from 'cannon';

import { COIN_MATERIAL } from './track/objects/coin/';
import { SNOWDRIFT_MATERIAL } from './track/objects/snowdrift/';

export const material = new CANNON.Material();

export default function createPlayer() {
  let boosterTimeoutId = null;
  let reducerTimeoutId = null;

  const player = new CANNON.Body({
    mass: 1,
    position: new CANNON.Vec3(0, 5, 0),
    shape: new CANNON.Sphere(1.5),
    fixedRotation: true,
    linearDamping: 0.999,
    material,
  });

  const resetSpeedBooster = () =>
    setTimeout(() => {
      player.userData.speed = player.userData.initialSpeed;
      boosterTimeoutId = null;
    }, player.userData.speedBoosterTime);

  const resetSpeedReducer = () =>
    setTimeout(() => {
      player.userData.speed = player.userData.initialSpeed;
      boosterTimeoutId = null;
    }, player.userData.speedReducerTime);


  const handleCoinCollide = (object) => {
    object.removeEventListener('collide', () => player.userData.collideHandler(object));
    player.userData.objectsToRemove.push(object);
    player.userData.speed = player.userData.speedBooster;

    clearTimeout(reducerTimeoutId);
    clearTimeout(boosterTimeoutId);
    boosterTimeoutId = resetSpeedBooster();
  };

  const handleSnowdriftCollide = (object) => {
    if (player.userData.lastCollidateSnowdrift !== object.userData.name) {
      player.userData.speed = player.userData.speedReducer;

      clearTimeout(reducerTimeoutId);
      clearTimeout(boosterTimeoutId);
      reducerTimeoutId = resetSpeedReducer();
    }
  };

  player.userData = {
    initialSpeed: 500,
    speed: 500,
    speedBooster: 900,
    speedBoosterTime: 1500,
    speedReducer: 200,
    speedReducerTime: 500,
    objectsToRemove: [],
    lastCollidateSnowdrift: '',
    collideHandler: (object, fn) => {
      switch (object.material.name) {
        case COIN_MATERIAL:
          handleCoinCollide(object, fn);
          break;
        case SNOWDRIFT_MATERIAL:
          handleSnowdriftCollide(object);
          break;
        default:
          return null;
      }
    },
  };

  return player;
}
