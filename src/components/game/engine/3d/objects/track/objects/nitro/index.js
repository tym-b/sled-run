import { createTexturizedObject } from '../../../../utils';
import geometry from './nitro.json';
import texture from './nitro.jpg';


export default async function createGroundStraight() {
  const mesh = await createTexturizedObject(geometry, texture);

  mesh.castShadow = true;

  return mesh;
}
