import * as CANNON from 'cannon';
import TWEEN from 'tween.js';
import { identity } from 'ramda';

import { NITRO_MATERIAL_NAME } from './track/objects/nitro';
import { PUDDLE_MATERIAL_NAME } from './track/objects/puddle';
import { META_MATERIAL_NAME } from './track/objects/meta';
import { RAMP_MATERIAL_NAME } from './track/objects/ramp';
import { STONE_MATERIAL_NAME } from './track/objects/stone';
import { RED_PLAYER } from '../../../../../../server/helpers';
import params from '../../params';

export const PLAYER_MATERIAL_NAME = 'playerMaterial';
export const material = new CANNON.Material(PLAYER_MATERIAL_NAME);

export default function createPlayer({
  type,
  position,
  onCollide = identity,
  onFinish = identity,
  onBoostCollect = identity,
}, audio) {
  let speedModifierTimeoutId = null;

  let puddleCollisionFilter = false;
  let puddleCollisionFilterTimeout = null;

  const player = new CANNON.Body({
    mass: 2,
    position: new CANNON.Vec3(position.x, 1, 0),
    fixedRotation: true,
    linearDamping: 0.97,
    material,
  });

  player.addShape(new CANNON.Box(new CANNON.Vec3(1.5, 0.5, 3)), new CANNON.Vec3(0, 0, -1.5));
  player.addShape(new CANNON.Sphere(1.5), new CANNON.Vec3(0, 0, -5));
  player.addShape(new CANNON.Sphere(1.5), new CANNON.Vec3(0, 0, 1));

  const modifySpeed = (speed, time) => {
    player.userData.speed = speed;

    clearTimeout(speedModifierTimeoutId);

    setTimeout(() => {
      player.userData.speed = params.INITIAL_SPEED;
      speedModifierTimeoutId = null;
    }, time);
  };

  const handleNitroCollide = (body) => {
    player.userData.nitros += 1;
    player.userData.nitrosToRemove.push(body);
  };

  const handlePuddleCollide = (body) => {
    if (!puddleCollisionFilter) {
      clearTimeout(puddleCollisionFilterTimeout);
      puddleCollisionFilter = true;
      puddleCollisionFilterTimeout = setTimeout(() => (puddleCollisionFilter = false), 1000);

      player.userData.puddlesToExplode.push(body);
      modifySpeed(params.REDUCED_SPEED, params.REDUCED_SPEED_INTERVAL);
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
      case NITRO_MATERIAL_NAME:
        handleNitroCollide(body);
        onBoostCollect(type, player.userData.nitros);
        audio.sounds.collect.play();
        break;
      case PUDDLE_MATERIAL_NAME:
        handlePuddleCollide(body);
        audio.sounds.puddle.play();
        break;
      case META_MATERIAL_NAME:
        handleMetaCollide(body);
        onFinish(type);
        break;
      case RAMP_MATERIAL_NAME:
        audio.sounds.jump.play();
        break;
      case STONE_MATERIAL_NAME:
        audio.sounds.crash.play();
        break;
      case PLAYER_MATERIAL_NAME:
        if (type === RED_PLAYER) {
          audio.sounds.crash.play();
        }
        break;
      default:
    }
  });

  player.userData = {
    type,
    speed: 0,
    nitros: params.INITIAL_NITROS,
    nitrosToRemove: [],
    puddlesToExplode: [],
    rotation: 0,
    useBoost: () => {
      if (player.userData.nitros > 0) {
        player.userData.nitros -= 1;
        audio.sounds.nitro.play();
        modifySpeed(params.BOOSTED_SPEED, params.BOOSTED_SPEED_INTERVAL);
        return player.userData.nitros;
      }
      return false;
    },
  };

  return player;
}
