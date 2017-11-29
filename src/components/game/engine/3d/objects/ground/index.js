import * as THREE from 'three';

import { loadTexture } from '../../utils';
import groundTexture from './ground.jpg';


export default async function createGround() {
  const texture = await loadTexture(groundTexture);
  const geometry = new THREE.PlaneBufferGeometry(10000, 10000);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const mesh = new THREE.Mesh(geometry, material);

  mesh.rotation.x = -Math.PI / 2;

  return mesh;
}
