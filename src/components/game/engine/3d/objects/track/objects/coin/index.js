import { createTexturizedObject } from '../../../../utils';
import geometry from './coin.json';
import texture from './coin.jpg';


export default function createGroundStraight() {
  return createTexturizedObject(geometry, texture);
}
