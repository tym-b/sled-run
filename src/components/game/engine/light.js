import * as THREE from 'three';


export default class Light {
  constructor() {
    this.light = new THREE.AmbientLight({ color: 0xffffff });
  }

  get threeObject() {
    return this.light;
  }
}
