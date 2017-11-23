import * as THREE from 'three';


export default class Scene {
  constructor() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff);
  }

  add(...objects) {
    objects.forEach(({ threeObject }) => {
      this.scene.add(threeObject);
    });
  }

  get threeObject() {
    return this.scene;
  }
}
