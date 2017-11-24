import * as CANNON from 'cannon';
import * as THREE from 'three';
import Scene from './scene';
import Camera from './camera';
import Renderer from './renderer';
import Light from './light';
import Player from '../objects/player/player';
import Sky from '../objects/sky/sky';

window.THREE = THREE;
window.CANNON = CANNON;

require('cannon/tools/threejs/CannonDebugRenderer');


export default class Engine3D {
  constructor(renderTarget, physics) {
    this.scene = new Scene();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.light = new Light();
    this.physics = physics;

    this.scene.add(this.light);
    this.scene.add(this.camera);

    this.cannonDebugRenderer = new THREE.CannonDebugRenderer(this.scene.threeObject, this.physics.world);

    renderTarget.appendChild(this.renderer.domElement);
  }

  async load() {
    this.player = new Player();
    this.sky = new Sky();

    await Promise.all([this.player.load(), this.sky.load()]);

    this.scene.add(this.player, this.sky);
  }

  updateViewport = () => {
    this.renderer.updateViewport();
    this.camera.updateViewport();
  };

  render = () => {
    this.player.threeObject.position.copy(this.physics.player.position);
    this.player.threeObject.quaternion.copy(this.physics.player.quaternion);
    this.renderer.render(this.scene, this.camera);
    this.cannonDebugRenderer.update();
  };
}
