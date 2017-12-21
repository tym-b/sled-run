import * as THREE from 'three';


export function updateRenderer(renderer) {
  renderer.setSize(window.innerWidth, window.innerHeight);
  // renderer.setPixelRatio(window.devicePixelRatio || 1);
}

export default function createRenderer() {
  const renderer = new THREE.WebGLRenderer({ antialias: true });

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  updateRenderer(renderer);

  return renderer;
}
