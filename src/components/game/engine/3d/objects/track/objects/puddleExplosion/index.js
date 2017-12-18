import * as THREE from 'three';
import TWEEN from 'tween.js';
import { times } from 'lodash';

import particleTexture from './drop.png';
import { loadTexture } from '../../../../utils';


export default async function createPuddleExplosion() {
  const texture = await loadTexture(particleTexture);
  const geometry = new THREE.Geometry();
  const material = new THREE.PointsMaterial({
    map: texture,
    size: 0.7,
    transparent: true,
  });

  times(500, () => {
    geometry.vertices.push(new THREE.Vector3(
      THREE.Math.randFloatSpread(40),
      THREE.Math.randFloatSpread(15),
      THREE.Math.randFloatSpread(40),
    ));
  });

  return new THREE.Points(geometry, material);
}

export function explode(mesh) {
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

    mesh.onBeforeRender = () => {
      const { scale, offset } = explosionParams;

      mesh.scale.setScalar(scale);
      mesh.position.setY(-offset);
    };

    mesh.onBeforeRender();
  });
}
