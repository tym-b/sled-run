import * as THREE from 'three';


export default function createLight() {
  return new THREE.AmbientLight(0xffffff, 0.5);
}

export function createPlayerLights() {
  const light = new THREE.DirectionalLight(0x87e6ff, 0.25);

  light.position.set(0, 40, -20);
  light.castShadow = true;
  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;
  light.shadow.camera.near = 10;
  light.shadow.camera.far = 1000;

  return [light, light.clone()];
}
