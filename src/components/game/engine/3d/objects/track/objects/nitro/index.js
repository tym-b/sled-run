import { createTexturizedObject } from '../../../../utils';
import geometry from './nitro.json';
import texture from './nitro.jpg';


export default function createGroundStraight() {
  return createTexturizedObject(geometry, texture);
}
