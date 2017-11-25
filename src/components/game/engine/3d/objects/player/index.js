import * as THREE from 'three';

import createSanta from './objects/santa';
import createSled from './objects/sled';


export default async function createPlayer() {
  const [santa, sled] = await Promise.all([createSanta(), createSled()]);
  const player = new THREE.Group();

  player.add(santa);
  player.add(sled);

  return player;
}
