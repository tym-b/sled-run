import * as THREE from 'three';


export default function createLight() {
  return new THREE.AmbientLight({ color: 0xffffff });
}

export function createPlayerLight() {
  const light = new THREE.PointLight(0xffffff, 1, 30);

  light.position = new THREE.Vector3(0, 20, 0);

  return light;
}
