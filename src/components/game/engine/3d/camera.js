import * as THREE from 'three';


export default function createCamera() {
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1100);

  camera.position.z = 15;
  camera.position.y = 5;

  return camera;
}
