import * as CANNON from 'cannon';
import TWEEN from 'tween.js';
import { identity } from 'ramda';

import { COIN_MATERIAL_NAME } from './track/objects/coin';
import { PUDDLE_MATERIAL_NAME } from './track/objects/puddle';
import { META_MATERIAL_NAME } from './track/objects/meta';

export const INITIAL_SPEED = 500;
export const BOOSTED_SPEED = 900;
export const BOOSTED_SPEED_INTERVAL = 1500;
export const REDUCED_SPEED = 200;
export const REDUCED_SPEED_INTERVAL = 500;

export const PLAYER_MATERIAL_NAME = 'playerMaterial';
export const material = new CANNON.Material(PLAYER_MATERIAL_NAME);

export default function createPlayer({ type, position, onCollide = identity }) {
  let speedModifierTimeoutId = null;

  let puddleCollisionFilter = false;
  let puddleCollisionFilterTimeout = null;

  const player = new CANNON.Body({
    mass: 2,
    position: new CANNON.Vec3(position.x, 1, 0),
    fixedRotation: true,
    linearDamping: 0.95,
    material,
  });

  player.addShape(new CANNON.Box(new CANNON.Vec3(1.5, 0.5, 3)), new CANNON.Vec3(0, 0, -1.5));
  player.addShape(new CANNON.Sphere(1.5), new CANNON.Vec3(0, 0, -5));
  player.addShape(new CANNON.Sphere(1.5), new CANNON.Vec3(0, 0, 1));

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

  const handlePuddleCollide = (body) => {
    if (!puddleCollisionFilter) {
      clearTimeout(puddleCollisionFilterTimeout);
      puddleCollisionFilter = true;
      puddleCollisionFilterTimeout = setTimeout(() => (puddleCollisionFilter = false), 1000);

      player.userData.puddlesToExplode.push(body);
      modifySpeed(REDUCED_SPEED, REDUCED_SPEED_INTERVAL);
    }
  };

  const handleMetaCollide = () => {
    new TWEEN.Tween(player.userData)
      .to({ speed: 0 }, 2000)
      .easing(TWEEN.Easing.Cubic.Out)
      .start();
  };

  player.addEventListener('collide', ({ body }) => {
    onCollide(type);

    switch (body.material.name) {
      case COIN_MATERIAL_NAME:
        handleCoinCollide(body);
        break;
      case PUDDLE_MATERIAL_NAME:
        handlePuddleCollide(body);
        break;
      case META_MATERIAL_NAME:
        handleMetaCollide(body);
        break;
      default:
    }
  });

  player.userData = {
    type,
    speed: INITIAL_SPEED,
    coinsToRemove: [],
    puddlesToExplode: [],
    rotation: 0,
  };

  return player;
}
