import * as THREE from 'three';

import { loadObject, loadTexture } from '../../../../3d/utils';
import sledTexture from './sled.jpg';
import sledGeometry from './sled.json';


export default async function createSled() {
  const [geometry, texture] = await Promise.all([
    loadObject(sledGeometry),
    loadTexture(sledTexture),
  ]);
  const material = new THREE.MeshBasicMaterial({ map: texture });

  return new THREE.Mesh(geometry, material);
}
