import { createTexturizedObject } from '../../../../utils';
import texture from './start.jpg';
import geometry from './start.json';


export default function createStart() {
  return createTexturizedObject(geometry, texture);
}
