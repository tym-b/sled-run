import * as THREE from 'three';

import { parseObject, loadTexture } from '../../../../utils';
import treeGeometry from './tree.json';
import treeTexture from './tree.jpg';


export default async function createTree() {
  const [geometry, texture] = await Promise.all([parseObject(treeGeometry), loadTexture(treeTexture)]);
  const material = new THREE.MeshBasicMaterial({ map: texture });

  return new THREE.Mesh(geometry, material);
}
