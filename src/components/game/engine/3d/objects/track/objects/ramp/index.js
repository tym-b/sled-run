import * as THREE from 'three';

import { parseObject, loadTexture } from '../../../../utils';
import rampTexture from './ramp.jpg';
import rampGeometry from './ramp.json';


export default async function createramp() {
  const [geometry, texture] = await Promise.all([parseObject(rampGeometry), loadTexture(rampTexture)]);
  const material = new THREE.MeshBasicMaterial({ map: texture });

  return new THREE.Mesh(geometry, material);
}
