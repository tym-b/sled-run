import { createTexturizedObject } from '../../../../utils';
import geometry from './groundStraight.json';
import texture from '../../textures/ground.jpg';


export default function createGroundStraight() {
  return createTexturizedObject(geometry, texture);
}
