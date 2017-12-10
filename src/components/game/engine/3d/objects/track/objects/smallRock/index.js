import * as THREE from 'three';

import { parseObject, loadTexture } from '../../../../utils';
import rockTexture from './smallRock.jpg';
import rockGeometry from './smallRock.json';


export default async function createSmallRock() {
  const [geometry, texture] = await Promise.all([parseObject(rockGeometry), loadTexture(rockTexture)]);
  const material = new THREE.MeshBasicMaterial({ map: texture });

  return new THREE.Mesh(geometry, material);
}
