import * as CANNON from 'cannon';
import * as THREE from 'three';

import { trackToRockPositions } from './utils';

import createScene from './scene';
import createCamera from './camera';
import createRenderer from './renderer';
import createLight from './light';

import createPlayer from './objects/player';
import createSky from './objects/sky';
import createGround from './objects/ground';
import createRock from './objects/rock';

window.THREE = THREE;
window.CANNON = CANNON;

require('cannon/tools/threejs/CannonDebugRenderer');


export default class Engine3D {
  scene = createScene();
  camera = createCamera();
  renderer = createRenderer();
  light = createLight();

  constructor(renderTarget, physics, track) {
    this.physics = physics;

    this.track = track;
    this.scene.add(this.light);
    this.scene.add(this.camera);

    this.cannonDebugRenderer = new THREE.CannonDebugRenderer(this.scene, this.physics.world);

    renderTarget.appendChild(this.renderer.domElement);
  }

  async load() {
    this.player = await createPlayer();
    this.sky = await createSky();
    this.ground = await createGround();

    const rockObj = await createRock();

    this.track.forEach(point => {
      const rock = rockObj.clone();
      rock.scale.set(2, 2, 2);
      rock.rotation.set(0, Math.random() * Math.PI, 0);
      rock.position.copy(point);
      this.scene.add(rock);
    });

    // this.player.add(this.ground);

    this.scene.add(this.player, this.sky, this.ground);
  }

  updateViewport = () => {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio || 1);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  };

  updatePlayer = () => {
    this.player.position.copy(this.physics.player.position);
    this.player.quaternion.copy(this.physics.player.quaternion);
  }

  render = () => {
    this.updatePlayer();
    this.camera.position.copy(this.player.position.clone().add(new THREE.Vector3(0, 5, 15)));
    this.sky.position.copy(this.player.position);
    this.renderer.render(this.scene, this.camera);
    this.cannonDebugRenderer.update();
  };
}
