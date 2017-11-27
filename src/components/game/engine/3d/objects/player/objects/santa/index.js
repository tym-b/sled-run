import * as THREE from 'three';

import { loadObject, loadTexture } from '../../../../utils';
import santaGeometry from './santa.json';
import santaTexture from './santa.jpg';


export default async function createSanta() {
  const [geometry, texture] = await Promise.all([loadObject(santaGeometry), loadTexture(santaTexture)]);
  const material = new THREE.MeshBasicMaterial({ map: texture });

  return new THREE.Mesh(geometry, material);
}
