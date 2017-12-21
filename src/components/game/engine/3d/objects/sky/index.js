import * as THREE from 'three';

import { loadTexture } from '../../utils';
import skyTexture from './sky.jpg';


export default async function createSky() {
  const texture = await loadTexture(skyTexture);
  const geometry = new THREE.SphereBufferGeometry(400, 30, 20);
  const material = new THREE.MeshBasicMaterial({ map: texture });

  geometry.scale(-1, 1, 1);

  return new THREE.Mesh(geometry, material);
}
