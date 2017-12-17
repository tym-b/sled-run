import * as THREE from 'three';


export default function createLight() {
  return new THREE.AmbientLight(0xffffff, 0.5);
}

export function createPlayerLights() {
  const light = new THREE.SpotLight(0xffffff, 1, 0, Math.PI / 2);

  light.position.set(-300, 1000, 100);
  light.castShadow = true;
  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;
  light.shadow.camera.near = 500;
  light.shadow.camera.far = 4000;
  light.shadow.camera.fov = 30;

  return [light.clone(), light];
}
