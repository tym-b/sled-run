import { createTexturizedObject } from '../../../../utils';
import texture from './ramp.jpg';
import geometry from './ramp.json';


export default function createRamp() {
  return createTexturizedObject(geometry, texture);
}
