import * as THREE from 'three';


export default function createLight() {
  return new THREE.AmbientLight(0xffffff, 0.9);
}

export function createPlayerLights() {
  const light = new THREE.PointLight(0xffffff, 0.25, 0);

  light.position.set(1, 40, 0);

  light.castShadow = true;
  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;
  light.shadow.camera.near = 10;
  light.shadow.camera.far = 1000;

  return [light, light.clone()];
}