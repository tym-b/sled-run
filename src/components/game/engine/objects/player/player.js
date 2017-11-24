import * as THREE from 'three';

import Santa from './objects/santa/santa';
import Sled from './objects/sled/sled';


export default class Player {
  async load() {
    this.santa = new Santa();
    this.sled = new Sled();

    await Promise.all([this.santa.load(), this.sled.load()]);

    this.threeObject = new THREE.Group();
    this.threeObject.add(this.santa.threeObject);
    this.threeObject.add(this.sled.threeObject);
  }
}
