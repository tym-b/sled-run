import * as THREE from 'three';


export default function createScene() {
  const scene = new THREE.Scene();

  scene.fog = new THREE.FogExp2(0xffffff, 0.002);
  scene.background = new THREE.Color(0xffffff);

  return scene;
}
