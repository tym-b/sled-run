import * as THREE from 'three';

const CAMERAS = [
  { x: 0, width: 0 },
  { x: 0, width: 1 },
];

export default function createCameras() {
  const { innerWidth, innerHeight } = window;

  return CAMERAS.map(({ x, width }) => {
    const camera = new THREE.PerspectiveCamera(60, width * innerWidth / innerHeight, 1, 500);

    camera.position.set(0, 4, 20);
    camera.userData.width = width * innerWidth;
    camera.userData.x = x * innerWidth;

    return camera;
  });
}

export function updateCameras(cameras) {
  const { innerWidth, innerHeight } = window;

  cameras.forEach((camera, index) => {
    camera.aspect = CAMERAS[index].width * innerWidth / innerHeight;
    camera.updateProjectionMatrix();
  });
}
