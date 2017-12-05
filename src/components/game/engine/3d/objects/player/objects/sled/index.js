import * as THREE from 'three';

import { loadObject, loadTexture } from '../../../../utils';
import sledTexture from './sled.jpg';

const sledGeometry = require('file-loader!./sled.json');


export default async function createSled() {
  const [geometry, texture] = await Promise.all([
    loadObject(sledGeometry),
    loadTexture(sledTexture),
  ]);
  const material = new THREE.MeshBasicMaterial({ map: texture });

  return new THREE.Mesh(geometry, material);
}