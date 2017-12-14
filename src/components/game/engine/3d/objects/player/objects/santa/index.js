import { createTexturizedObject } from '../../../../utils';
import geometry from './santa.json';
import texture from './santa.jpg';


export default function createSanta() {
  return createTexturizedObject(geometry, texture);
}
