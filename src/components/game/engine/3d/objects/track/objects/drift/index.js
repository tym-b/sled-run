import * as THREE from 'three';
import { times } from 'lodash';
import TWEEN from 'tween.js';

import particleTexture from './drift-particle.png';
import { loadTexture } from '../../../../utils';


export default async function createDrift() {
  const texture = await loadTexture(particleTexture);
  const geometry = new THREE.Geometry();
  const material = new THREE.PointsMaterial({ map: texture, size: 0.6, blending: THREE.AdditiveBlending, transparent: true });

  const params = { scale: 0.00001, offset: 0 };
  let shouldRemove = false;

  times(500, () => {
    geometry.vertices.push(new THREE.Vector3(
      THREE.Math.randFloatSpread(40),
      THREE.Math.randFloatSpread(15),
      THREE.Math.randFloatSpread(25),
    ));
  });

  const points = new THREE.Points(geometry, material);

  new TWEEN.Tween(params)
    .to({ scale: 1 }, 1500)
    .delay(2000)
    .easing(TWEEN.Easing.Quintic.Out)
    .start();

  new TWEEN.Tween(params)
    .to({ offset: 10 }, 3000)
    .delay(2300)
    .easing(TWEEN.Easing.Linear.None)
    .onComplete(() => (shouldRemove = true))
    .start();

  points.onBeforeRender = () => {
    points.scale.setScalar(params.scale);
    points.position.setY(-params.offset);
  };

  points.onAfterRender = (renderer, scene) => shouldRemove && scene.remove(points);

  return points;
}
