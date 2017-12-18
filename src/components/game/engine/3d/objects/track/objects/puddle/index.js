import { createTexturizedObject } from '../../../../utils';
import geometry from './puddle.json';
import texture from './puddle.jpg';

export default async function createPuddle() {
  return createTexturizedObject(geometry, texture);
}
