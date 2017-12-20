import * as THREE from 'three';

import createSanta from './objects/santa';
import createSled from './objects/sled';
import createFire, { animateFire } from './objects/fire';
import params from '../../../params';

import { GREEN_PLAYER } from '../../../../../../../server/helpers';

const MAX_VELOCITY = 20000;

export default async function createPlayer(type, camera, light) {
  const [santa, sled, fire, leftFire, rightFire] = await Promise.all([
    createSanta(type === GREEN_PLAYER),
    createSled(type === GREEN_PLAYER),
    createFire(),
    createFire(),
    createFire()
  ]);
  const player = new THREE.Group();
  const vehicle = new THREE.Group();

  santa.castShadow = true;
  santa.receiveShadow = false;
  sled.castShadow = true;
  sled.receiveShadow = false;
  fire.castShadow = true;
  fire.receiveShadow = false;
  leftFire.castShadow = true;
  leftFire.receiveShadow = false;
  rightFire.castShadow = true;
  rightFire.receiveShadow = false;

  vehicle.add(santa, sled, fire, leftFire, rightFire);

  leftFire.position.set(-1, 0.25, 0);
  leftFire.scale.setScalar(0.5);

  rightFire.scale.setScalar(0.5);
  rightFire.position.set(1, 0.25, 0);

  player.userData.syncEffects = (velocity, angle, time) => {
    const boost = velocity.lengthSquared() / MAX_VELOCITY;
    const boostRight = angle / 10;
    const boostLeft = -boostRight;

    fire.scale.setScalar(0.9 + boost * 0.3);
    fire.position.setZ(boost * 0.5);
    animateFire(fire, time);

    leftFire.scale.setScalar(0.3 + boostLeft * 0.3);
    leftFire.position.setZ(0.5 + boostLeft * 1.5);
    animateFire(leftFire, time);

    rightFire.scale.setScalar(0.3 + boostRight * 0.3);
    rightFire.position.setZ(0.5 + boostRight * 1.5);
    animateFire(rightFire, time);

    vehicle.rotation.z = boostRight * params.TILT_MULTIPLIER;

    const cameraXDest = boostRight * params.CAMERA_TILT_MULTIPLIER;
    const cameraXDiff = cameraXDest - camera.position.x;

    camera.position.set(camera.position.x + cameraXDiff * 0.1, 3, 12 * (1 + boost));
    camera.lookAt(new THREE.Vector3(0, 0, 0));
  };

  player.add(vehicle, camera, light);

  return player;
}
