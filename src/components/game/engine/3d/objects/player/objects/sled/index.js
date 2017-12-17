import { createTexturizedObject } from '../../../../utils';
import geometry from './sled.json';
import texture from './sled.jpg';


export default function createSanta() {
  const mesh = createTexturizedObject(geometry, texture);

  mesh.castShadow = true;

  return mesh;
}
