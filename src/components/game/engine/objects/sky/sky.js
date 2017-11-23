import * as THREE from 'three';

import { loadTexture } from '../../utils';
import skyTexture from './sky.jpg';


export default class Sky {
  async load() {
    const texture = await loadTexture(skyTexture);
    const geometry = new THREE.SphereBufferGeometry(500, 60, 40);
    const material = new THREE.MeshBasicMaterial({ map: texture });

    geometry.scale(-1, 1, 1);

    this.sky = new THREE.Mesh(geometry, material);
  }

  get threeObject() {
    return this.sky;
  }
}
