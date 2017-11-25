import * as THREE from 'three';

import trackGeometry from './track.json';
import trackTexture from './track.jpg';
import { loadObject, loadTexture } from '../../utils';


export default async function createTrack() {
  const [geometry, texture] = await Promise.all([loadObject(trackGeometry), loadTexture(trackTexture)]);
  const material = new THREE.MeshBasicMaterial({ map: texture });

  return new THREE.Mesh(geometry, material);
}
