import * as THREE from 'three';

export default async function createMeta() {
  const geometry = new THREE.BoxGeometry(100, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000, });

  return new THREE.Mesh(geometry, material);
}
