import * as THREE from 'three';

const CAMERAS = [
  { x: 0, width: 0.5 },
  { x: 0.5, width: 0.5 },
];

export default function createCameras() {
  const { innerWidth, innerHeight } = window;

  return CAMERAS.map(({ x, width }) => {
    const camera = new THREE.PerspectiveCamera(60, width * innerWidth / innerHeight, 1, 500);

    camera.userData.width = width * innerWidth;
    camera.userData.x = x * innerWidth;

    return camera;
  });
}

export function updateCameras(cameras) {
  const { innerWidth, innerHeight } = window;

  cameras.forEach((camera, index) => {
    camera.userData.width = CAMERAS[index].width * innerWidth;
    camera.userData.x = CAMERAS[index].x * innerWidth;
    camera.aspect = CAMERAS[index].width * innerWidth / innerHeight;
    camera.updateProjectionMatrix();
  });
}
