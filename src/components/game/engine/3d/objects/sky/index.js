import * as THREE from 'three';

import { loadTexture } from '../../3d/utils';
import skyTexture from './sky.jpg';


export default async function createSky() {
  const texture = await loadTexture(skyTexture);
  const geometry = new THREE.SphereBufferGeometry(500, 60, 40);
  const material = new THREE.MeshBasicMaterial({ map: texture });

  geometry.scale(-1, 1, 1);

  return new THREE.Mesh(geometry, material);
}
