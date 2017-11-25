import * as THREE from 'three';


export default function createLight() {
  return new THREE.AmbientLight({ color: 0xffffff });
}
