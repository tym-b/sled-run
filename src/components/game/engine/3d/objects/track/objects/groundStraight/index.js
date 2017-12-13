import * as THREE from 'three';

import { parseObject, loadTexture } from '../../../../utils';
import groundGeometry from './groundStraight.json';
import groundTexture from '../../textures/ground.jpg';


export default async function createGroundStraight() {
  const [geometry, texture] = await Promise.all([parseObject(groundGeometry), loadTexture(groundTexture)]);
  const material = new THREE.MeshBasicMaterial({ map: texture });

  return new THREE.Mesh(geometry, material);
}
