import * as THREE from 'three';
import * as CANNON from 'cannon';

import createScene from './scene';
import createCamera from './camera';
import createRenderer from './renderer';
import createLight from './light';

import createPlayer from './objects/player';
import createSky from './objects/sky';
import createTrack from './objects/track';

window.THREE = THREE;
window.CANNON = CANNON;

require('cannon/tools/threejs/CannonDebugRenderer');


export default class Engine3D {
  scene = createScene();
  camera = createCamera();
  renderer = createRenderer();
  light = createLight();

  constructor(renderTarget, physics, trackData) {
    this.physics = physics;
    this.physics.world.addEventListener('removeBody', this.handleRemoveObject);
    this.physics.onSnowdriftCollide = this.handleSnowdriftCollide;

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

    // this.camera.position.set(0, 500, -100);
    // this.camera.lookAt(new THREE.Vector3(0, 0, -100));
    this.camera.position.set(0, 5, 15);
    this.player.add(this.camera);

    this.scene.add(this.player, this.sky, this.track);
  }

  handleRemoveObject = ({ body }) => {
    const objectToRemove = this.scene.getObjectByName(body.userData.name);
    objectToRemove.parent.remove(objectToRemove);
  };

  handleSnowdriftCollide = (body) => {
    debugger;
  };

  updateViewport = () => {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio || 1);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  };

  syncWorld = () => {
    ['player'].forEach((key) => {
      const cannonObject = this.physics[key];
      const threeObject = this[key];

      threeObject.position.copy(cannonObject.position);
      threeObject.quaternion.copy(cannonObject.quaternion);
    });
  };

  render = () => {
    this.syncWorld();
    this.sky.position.copy(this.player.position);
    this.renderer.render(this.scene, this.camera);
    this.cannonDebugRenderer.update();
  };
}
