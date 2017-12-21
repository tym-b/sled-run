import { createTexturizedObject } from '../../../../utils';
import geometry from './sled.json';
import texture from './sled.jpg';
import textureGreen from './sled-green.jpg';


export default function createSanta(green) {
  return createTexturizedObject(geometry, green ? textureGreen : texture);
}
