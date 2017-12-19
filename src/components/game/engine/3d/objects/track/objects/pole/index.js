import * as THREE from 'three';
import { createTexturizedObject } from '../../../../utils';
import geometry from './pole.json';
import texture from './pole.jpg';

export default async function createPuddle() {
  const mesh = await createTexturizedObject(geometry, texture);

  mesh.material.side = THREE.DoubleSide;

  return mesh;
}
