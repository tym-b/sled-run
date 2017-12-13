import * as CANNON from 'cannon';

import { COIN_MATERIAL } from './track/objects/coin/';
import { SNOWDRIFT_MATERIAL } from './track/objects/snowdrift/';

let boosterTimeoutId = null;
let reducerTimeoutId = null;

export const material = new CANNON.Material();

export default function createPlayer() {
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


  const handleCoinCollide = (object, fn) => {
    object.removeEventListener('collide', () => player.userData.collideHandler(object));
    player.userData.objectsToRemove.push(object);
    player.userData.speed = player.userData.speedBooster;

    if (boosterTimeoutId) {
      clearTimeout(boosterTimeoutId);
      boosterTimeoutId = resetSpeedBooster();
    } else {
      boosterTimeoutId = resetSpeedBooster();
    }
    if (fn) {
      fn(object);
    }
  };

  const handleSnowdriftCollide = (object, fn) => {
    if (player.userData.lastCollidateSnowdrift !== object.userData.name) {
      player.userData.speed = player.userData.speedReducer;

      if (reducerTimeoutId) {
        clearTimeout(reducerTimeoutId);
        reducerTimeoutId = resetSpeedReducer();
      } else {
        clearTimeout(boosterTimeoutId);
        reducerTimeoutId = resetSpeedReducer();
      }
      if (fn) {
        fn(object);
      }
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
