import * as THREE from 'three';


export function updateRenderer(renderer) {
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio || 1);
}

export default function createRenderer() {
  const renderer = new THREE.WebGLRenderer({ antialias: true });

  updateRenderer(renderer);

  return renderer;
}
