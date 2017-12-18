import * as THREE from 'three';

import createSanta from './objects/santa';
import createSled from './objects/sled';
import createFire, { animateFire } from './objects/fire';

import { GREEN_PLAYER } from '../../../../../../../server/helpers';


let time = 0;

export function update(t) {
  time = t;
}

export default async function createPlayer(type) {
  const [santa, sled, fire, leftFire, rightFire] = await Promise.all([
    createSanta(type === GREEN_PLAYER),
    createSled(type === GREEN_PLAYER),
    createFire(),
    createFire(),
    createFire()
  ]);
  const player = new THREE.Group();

  leftFire.position.set(-1, 0.25, 0);
  leftFire.scale.setScalar(0.5);
  rightFire.scale.setScalar(0.5);
  rightFire.position.set(1, 0.25, 0);

  fire.onBeforeRender = () => {
    const boost = player.userData.velocity.lengthSquared() / 20000;

    fire.scale.setScalar(0.9 + boost * 0.3);
    fire.position.setZ(boost * 0.5);

    animateFire(fire, time, boost);
  };

  leftFire.onBeforeRender = () => {
    const level = -player.userData.angle / 10;

    leftFire.scale.setScalar(0.3 + level * 0.3);
    leftFire.position.setZ(level * 1.5);

    animateFire(leftFire, time);
  };

  rightFire.onBeforeRender = () => {
    const level = player.userData.angle / 10;

    rightFire.scale.setScalar(0.3 + level * 0.3);
    rightFire.position.setZ(level * 1.5);

    animateFire(rightFire, time);
  };

  player.add(santa, sled, fire, leftFire, rightFire);

  return player;
}
