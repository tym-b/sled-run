import * as THREE from 'three';


export default function createCamera() {
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1100);

  camera.position.z = 5;
  camera.position.y = 3;

  return camera;
}
