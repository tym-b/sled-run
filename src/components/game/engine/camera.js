import * as THREE from 'three';


export default class Camera {
  constructor() {
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1100);
    this.camera.position.z = 10;
    this.camera.position.y = 1;
  }

  updateViewport() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }

  get threeObject() {
    return this.camera;
  }
}
