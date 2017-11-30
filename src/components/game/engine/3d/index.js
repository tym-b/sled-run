import * as THREE from 'three';

import createScene from './scene';
import createCamera from './camera';
import createRenderer from './renderer';
import createLight from './light';

import createPlayer from './objects/player';
import createSky from './objects/sky';
import createGround from './objects/ground';
import createTrack from './objects/track';


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
    this.threeAxesHelper = new THREE.AxesHelper(100);
    this.scene.add(this.threeAxesHelper);

    renderTarget.appendChild(this.renderer.domElement);
  }

  async load() {
    this.player = await createPlayer();
    this.sky = await createSky();
    this.ground = await createGround();
    this.track = await createTrack();

    this.scene.add(this.player, this.sky, this.track); //this.ground
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
