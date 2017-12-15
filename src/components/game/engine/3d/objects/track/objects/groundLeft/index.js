import { createTexturizedObject } from '../../../../utils';
import geometry from './groundLeft.json';
import texture from '../../textures/ground.jpg';


export default function createGroundStraight() {
  return createTexturizedObject(geometry, texture);
}
