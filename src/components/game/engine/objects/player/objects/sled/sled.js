import * as THREE from 'three';

import { loadObject, loadTexture } from '../../../../3d/utils';
import sledTexture from './sled.jpg';
import sledGeometry from './sled.json';


export default class Santa {
  async load() {
    const [geometry, texture] = await Promise.all([
      loadObject(sledGeometry),
      loadTexture(sledTexture),
    ]);
    const material = new THREE.MeshBasicMaterial({ map: texture });

    this.threeObject = new THREE.Mesh(geometry, material);
  }
}
