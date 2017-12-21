import { createTexturizedObject } from '../../../../utils';
import geometry from './tree.json';
import texture from './tree.jpg';


export default function createTree() {
  return createTexturizedObject(geometry, texture);
}
