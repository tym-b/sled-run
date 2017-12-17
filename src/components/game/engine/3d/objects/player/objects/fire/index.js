import * as THREE from 'three';
import SimplexNoise from 'simplex-noise';

import { parseObject } from '../../../../utils';
import objectJson from './fire.json';

const simplex = new SimplexNoise();

export function animateFire({ geometry, userData: { initialVertices, initialVerticesNormalized } }, time) {
  geometry.vertices.forEach((vertice, index) => {
    const initialVertice = initialVertices[index];
    const initialVerticeNormalized = initialVerticesNormalized[index];

    vertice
      .copy(initialVertice)
      .addScaledVector(initialVerticesNormalized[index], simplex.noise2D(
        initialVerticeNormalized.x + time,
        initialVerticeNormalized.y
      ) * 0.3);
  });

  geometry.verticesNeedUpdate = true;
}

export default async function createFire() {
  const geometry = await parseObject(objectJson);
  const material = new THREE.MeshLambertMaterial({ color: 0xffff5d });
  const fire = new THREE.Mesh(geometry, material);

  let time = 0;

  fire.userData.initialVertices = geometry.vertices.map(v => v.clone());
  fire.userData.initialVerticesNormalized = geometry.vertices.map(v => v.clone().normalize());

  fire.onBeforeRender = () => {
    time += 0.1;
    animateFire(fire, time);
  };

  return fire;
}
