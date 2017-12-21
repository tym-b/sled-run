import { createTexturizedObject } from '../../../../utils';
import texture from './stone.jpg';
import geometry from './stone.json';


export default function createStone() {
  return createTexturizedObject(geometry, texture);
}
