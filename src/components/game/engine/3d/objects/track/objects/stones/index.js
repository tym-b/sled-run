import { createTexturizedObject } from '../../../../utils';
import texture from './stones.jpg';
import geometry from './stones.json';


export default function createStones() {
  return createTexturizedObject(geometry, texture);
}
