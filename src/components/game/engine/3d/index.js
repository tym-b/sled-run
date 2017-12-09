import * as THREE from 'three';
import * as CANNON from 'cannon';

import createScene from './scene';
import createCamera from './camera';
import createRenderer from './renderer';
import createLight from './light';

import createPlayer from './objects/player';
import createSky from './objects/sky';
import createTrack, { createBoosters } from './objects/track';

window.THREE = THREE;
window.CANNON = CANNON;

require('cannon/tools/threejs/CannonDebugRenderer');


export default class Engine3D {
  scene = createScene();
  camera = createCamera();
  renderer = createRenderer();
  light = createLight();
  objects = [];

  constructor(renderTarget, physics, trackData) {
    this.physics = physics;
    this.physics.onCollide = this.handleCoinCollide;
    this.trackData = trackData;

    this.scene.add(this.light);
    this.scene.add(this.camera);

    this.cannonDebugRenderer = new THREE.CannonDebugRenderer(this.scene, this.physics.world);

    renderTarget.appendChild(this.renderer.domElement);
  }

  async load() {
    this.player = await createPlayer();
    this.sky = await createSky();
    this.track = await createTrack(this.trackData);
    this.boosters = await createBoosters(this.trackData);

    this.scene.add(this.player, this.sky, this.track);

    this.boosters.forEach((booster) => {
      this.scene.add(booster);
    });
  }

  updateViewport = () => {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio || 1);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  };

  updatePhysics = (keys) => {
    keys.forEach((key) => {
      const cannonObject = this.physics[key];
      const threeObject = this[key];

      threeObject.position.copy(cannonObject.position);
      threeObject.quaternion.copy(cannonObject.quaternion);
    });
  };

  handleCoinCollide = (e, i) => {
    this.scene.remove(this.boosters[i]);
  };

  render = () => {
    this.updatePhysics(['player']);
    this.camera.position.copy(this.player.position.clone().add(new THREE.Vector3(0, 5, 50)));
    this.sky.position.copy(this.player.position);
    this.renderer.render(this.scene, this.camera);
    this.cannonDebugRenderer.update();
  };
}
