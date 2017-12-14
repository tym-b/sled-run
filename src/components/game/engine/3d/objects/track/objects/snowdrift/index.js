import * as THREE from 'three';

export default async function createSnowdrift() {
  const geometry = new THREE.CylinderGeometry(2, 2, 0.01, 8);
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000, });

  return new THREE.Mesh(geometry, material);
}
