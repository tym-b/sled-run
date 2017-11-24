import * as THREE from 'three';

import { loadObject, loadTexture } from '../../../../3d/utils';
import santaGeometry from './santa.json';
import santaTexture from './santa.jpg';


export default class Santa {
  async load() {
    const [geometry, texture] = await Promise.all([
      loadObject(santaGeometry),
      loadTexture(santaTexture),
    ]);
    const material = new THREE.MeshBasicMaterial({ map: texture });

    this.threeObject = new THREE.Mesh(geometry, material);
  }
}
