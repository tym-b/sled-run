import * as THREE from 'three';

import { loadObject, loadTexture } from '../../../../utils';
import santaTexture from './santa.jpg';

const santaGeometry = require('file-loader!./santa.json');


export default async function createSanta() {
  const [geometry, texture] = await Promise.all([loadObject(santaGeometry), loadTexture(santaTexture)]);
  const material = new THREE.MeshBasicMaterial({ map: texture });

  return new THREE.Mesh(geometry, material);
}
