import * as THREE from 'three';


export default function createLight() {
  return new THREE.AmbientLight(0xffffff, 0.5);
}

export function createPlayerLights() {
  const light = new THREE.PointLight(0xffffff, 2, 50);

  light.position.set(-0, 40, 0);

  return [light, light.clone()];
}
