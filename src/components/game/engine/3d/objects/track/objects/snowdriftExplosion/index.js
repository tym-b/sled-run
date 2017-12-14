import * as THREE from 'three';
import TWEEN from 'tween.js';
import { times } from 'lodash';

import particleTexture from './snow-particle.png';
import { loadTexture } from '../../../../utils';


export default async function createSnowdriftExplosion() {
  const texture = await loadTexture(particleTexture);
  const geometry = new THREE.Geometry();
  const material = new THREE.PointsMaterial({
    map: texture,
    size: 0.8,
    blending: THREE.AdditiveBlending,
    transparent: true,
  });

  times(500, () => {
    geometry.vertices.push(new THREE.Vector3(
      THREE.Math.randFloatSpread(40),
      THREE.Math.randFloatSpread(15),
      THREE.Math.randFloatSpread(25),
    ));
  });

  return new THREE.Points(geometry, material);
}

export function explode(snowdriftExplosion) {
  return new Promise((resolve) => {
    const explosionParams = { scale: 0.00001, offset: 0 };

    new TWEEN.Tween(explosionParams)
      .to({ scale: 1 }, 1500)
      .easing(TWEEN.Easing.Quintic.Out)
      .start();

    new TWEEN.Tween(explosionParams)
      .to({ offset: 10 }, 3000)
      .delay(300)
      .easing(TWEEN.Easing.Linear.None)
      .onComplete(resolve)
      .start();

    snowdriftExplosion.onBeforeRender = () => { // eslint-disable-line no-param-reassign
      const { scale, offset } = explosionParams;

      snowdriftExplosion.scale.setScalar(scale);
      snowdriftExplosion.position.setY(-offset);
    };

    snowdriftExplosion.onBeforeRender();
  });
}
