import * as THREE from 'three';

export default async function createSnowDrift() {
  const geometry = new THREE.CylinderGeometry(20, 20, 0.01, 8);
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000, });

  geometry.scale(1, 1, 1);

  return new THREE.Mesh(geometry, material);
}