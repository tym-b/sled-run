import * as THREE from 'three';

import Santa from './objects/santa/santa';
import Sled from './objects/sled/sled';


export default class Player {
  constructor() {
    this.player = new THREE.Group();
  }

  async load() {
    this.santa = new Santa();
    this.sled = new Sled();

    await Promise.all([this.santa.load(), this.sled.load()]);

    this.player.add(this.santa.threeObject);
    this.player.add(this.sled.threeObject);
  }

  get threeObject() {
    return this.player;
  }
}
