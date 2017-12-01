import * as THREE from 'three';

import { parseObject } from '../../../../utils';
import rockGeometry from './oblongRock.json';


export default async function createOblongRock() {
  const geometry = await parseObject(rockGeometry);
  const material = new THREE.MeshBasicMaterial({ color: 0xcccccc });

  return new THREE.Mesh(geometry, material);
}
