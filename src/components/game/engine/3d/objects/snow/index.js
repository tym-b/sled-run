import * as THREE from 'three';
import { times } from 'lodash';

import particleTexture from './snow-particle.png';
import { loadTexture } from '../../utils';


export default async function createSnow() {
  const texture = await loadTexture(particleTexture);
  const geometry = new THREE.Geometry();
  const material = new THREE.PointsMaterial({
    map: texture,
    size: 0.5,
    blending: THREE.AdditiveBlending,
    transparent: true,
  });

  times(2000, () => {
    geometry.vertices.push(new THREE.Vector3(
      THREE.Math.randFloatSpread(100),
      THREE.Math.randFloatSpread(100),
      THREE.Math.randFloatSpread(100),
    ));
  });

  const points = new THREE.Points(geometry, material);

  points.position.z = 10;

  points.onBeforeRender = () => {
    points.rotation.x -= 0.003;
  };

  return points;
}
