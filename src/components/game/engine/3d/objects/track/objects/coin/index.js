import * as THREE from 'three';

import { parseObject, loadTexture } from '../../../../utils';
import coinTexture from './coin.jpg';
import coinGeometry from './coin.json';


export default async function createCoin() {
  const [geometry, texture] = await Promise.all([parseObject(coinGeometry), loadTexture(coinTexture)]);
  const material = new THREE.MeshBasicMaterial({ map: texture });

  return new THREE.Mesh(geometry, material);
}
