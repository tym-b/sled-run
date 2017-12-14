import * as CANNON from 'cannon';

import { COIN_MATERIAL_NAME } from './track/objects/coin';
import { SNOWDRIFT_MATERIAL_NAME } from './track/objects/snowdrift';
import { META_MATERIAL_NAME } from './track/objects/meta';

export const INITIAL_SPEED = 500;
export const BOOSTED_SPEED = 900;
export const BOOSTED_SPEED_INTERVAL = 1500;
export const REDUCED_SPEED = 200;
export const REDUCED_SPEED_INTERVAL = 500;

export const PLAYER_MATERIAL_NAME = 'playerMaterial';
export const material = new CANNON.Material(PLAYER_MATERIAL_NAME);

export default function createPlayer() {
  let speedModifierTimeoutId = null;

  let snowdriftCollisionFilter = false;
  let snowdriftCollisionFilterTimeout = null;

  const player = new CANNON.Body({
    mass: 2,
    position: new CANNON.Vec3(0, 5, 0),
    shape: new CANNON.Sphere(1.5),
    fixedRotation: true,
    linearDamping: 0.99,
    material,
  });

  const modifySpeed = (speed, time) => {
    player.userData.speed = speed;

    clearTimeout(speedModifierTimeoutId);

    setTimeout(() => {
      player.userData.speed = INITIAL_SPEED;
      speedModifierTimeoutId = null;
    }, time);
  };

  const handleCoinCollide = (body) => {
    player.userData.coinsToRemove.push(body);
    modifySpeed(BOOSTED_SPEED, BOOSTED_SPEED_INTERVAL);
  };

  const handleMetaCollide = () => {
    setInterval(() => {
      player.userData.speed = player.userData.speed && player.userData.speed - 50;
    }, 100);
  };

  const handleSnowdriftCollide = (body) => {
    if (!snowdriftCollisionFilter) {
      clearTimeout(snowdriftCollisionFilterTimeout);
      snowdriftCollisionFilter = true;
      snowdriftCollisionFilterTimeout = setTimeout(() => (snowdriftCollisionFilter = false), 1000);

      player.userData.snowdriftsToExplode.push(body);
      modifySpeed(REDUCED_SPEED, REDUCED_SPEED_INTERVAL);
    }
  };

  player.addEventListener('collide', ({ body }) => {
    switch (body.material.name) {
      case COIN_MATERIAL_NAME:
        handleCoinCollide(body);
        break;
      case SNOWDRIFT_MATERIAL_NAME:
        handleSnowdriftCollide(body);
        break;
      case META_MATERIAL_NAME:
        handleMetaCollide(body);
        break;
      default:
    }
  });

  player.userData = {
    speed: INITIAL_SPEED,
    coinsToRemove: [],
    snowdriftsToExplode: [],
  };

  return player;
}
