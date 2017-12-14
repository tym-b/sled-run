import { createTexturizedObject } from '../../../../utils';
import texture from './smallRock.jpg';
import geometry from './smallRock.json';


export default function createSmallRock() {
  return createTexturizedObject(geometry, texture);
}
