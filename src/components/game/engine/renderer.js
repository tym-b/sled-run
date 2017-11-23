import * as THREE from 'three';


export default class Renderer {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.updateViewport();
  }

  updateViewport() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio || 1);
  }

  render(scene, camera) {
    this.renderer.render(scene.threeObject, camera.threeObject);
  }

  get domElement() {
    return this.renderer.domElement;
  }
}
