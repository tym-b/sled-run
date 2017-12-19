import * as THREE from 'three';
// import * as CANNON from 'cannon';

import createScene from './scene';
import createCameras, { updateCameras } from './cameras';
import createRenderer, { updateRenderer } from './renderer';
import createLight, { createPlayerLights } from './light';
import createSnow from './objects/snow';

import createPlayer from './objects/player';
import createSky from './objects/sky';
import createTrack from './objects/track';
import createPuddleExplosion, { explode } from './objects/track/objects/puddleExplosion';
import { GREEN_PLAYER, RED_PLAYER } from '../../../../../server/helpers';


// window.THREE = THREE;
// window.CANNON = CANNON;
// require('cannon/tools/threejs/CannonDebugRenderer');


export default class Engine3D {
  scene = createScene();
  cameras = createCameras();
  renderer = createRenderer();
  light = createLight();
  playerLights = createPlayerLights();

  constructor(renderTarget, physics, trackData) {
    this.trackData = trackData;

    this.setPhysics(physics);

    this.scene.add(this.light);

    // this.cannonDebugRenderer = new THREE.CannonDebugRenderer(this.scene, this.physics.world);

    renderTarget.appendChild(this.renderer.domElement);
  }

  setPhysics = (physics) => {
    this.physics = physics;
    this.physics.world.addEventListener('removeBody', this.handleRemoveObject);
    this.physics.onPuddleCollide = this.handlePuddleCollide;
  };

  async load() {
    this.players = [
      await createPlayer(GREEN_PLAYER, this.cameras[0], this.playerLights[0]),
      await createPlayer(RED_PLAYER, this.cameras[1], this.playerLights[1]),
    ];
    this.track = await createTrack(this.trackData);
    this.puddleExplosion = await createPuddleExplosion();
    this.sky = await createSky();
    this.snow = await createSnow();

    // this.debugCamera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 1, 1000);
    // this.debugCamera.position.set(0, 300, -100);
    // this.debugCamera.lookAt(new THREE.Vector3(0, 0, -100));
    // this.scene.add(this.debugCamera);

    this.scene.add(this.track, this.sky, ...this.players);
  }

  async reset() {
    this.scene.remove(this.track);
    this.track = await createTrack(this.trackData);
    this.scene.add(this.track);
  }

  handleRemoveObject = ({ body }) => {
    const objectToRemove = this.scene.getObjectByName(body.userData.name);

    if (objectToRemove) {
      objectToRemove.parent.remove(objectToRemove);
    }
  };

  handlePuddleCollide = async (body) => {
    const puddle = this.scene.getObjectByName(body.userData.name);

    if (puddle) {
      const puddleWorldPosition = puddle.parent.localToWorld(puddle.position.clone());
      const puddleExplosion = this.puddleExplosion.clone();

      puddleExplosion.position.copy(puddleWorldPosition);

      this.scene.add(puddleExplosion);

      await explode(puddleExplosion);

      this.scene.remove(puddleExplosion);
    }
  };

  updateViewport = () => {
    updateRenderer(this.renderer);
    updateCameras(this.cameras);
  };

  syncWorld = (time) => {
    this.players.forEach((player, index) => {
      const { position, quaternion, velocity, userData: { angle } } = this.physics.players[index];

      player.position.copy(position);
      player.quaternion.copy(quaternion);
      player.userData.syncEffects(velocity, angle, time);
    });

    this.physics.dynamicObjects.forEach(object => {
      const sceneObject = this.scene.getObjectByName(object.userData.name);

      if (sceneObject) {
        sceneObject.position.copy(object.position);
        sceneObject.quaternion.copy(object.quaternion);

        sceneObject.parent.updateMatrixWorld();
        sceneObject.applyMatrix(new THREE.Matrix4().getInverse(sceneObject.parent.matrixWorld));
      }
    });
  };

  render = (time) => {
    this.syncWorld(time);

    this.players.forEach((player, index) => {
      const camera = this.cameras[index];

      this.sky.position.copy(player.position);
      camera.add(this.snow);
      this.renderer.setViewport(camera.userData.x, 0, camera.userData.width, window.innerHeight);
      this.renderer.setScissor(camera.userData.x, 0, camera.userData.width, window.innerHeight);
      this.renderer.setScissorTest(true);
      this.renderer.render(this.scene, camera);
      camera.remove(this.snow);
    });

    // this.renderer.render(this.scene, this.debugCamera);
    // this.cannonDebugRenderer.update();
  };
}
