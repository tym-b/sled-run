import { createTexturizedObject } from '../../../../utils';
import geometry from './meta.json';
import texture from './meta.jpg';

export default async function createMeta() {
  return createTexturizedObject(geometry, texture);
}
