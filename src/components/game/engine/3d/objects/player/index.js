import * as THREE from 'three';

import createSanta from './objects/santa';
import createSled from './objects/sled';
import createFire from './objects/fire';


export default async function createPlayer() {
  const [santa, sled, fire] = await Promise.all([createSanta(), createSled(), createFire()]);
  const player = new THREE.Group();

  player.add(santa, sled, fire);

  return player;
}
