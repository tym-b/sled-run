import { createTexturizedObject } from '../../../../utils';
import geometry from './santa.json';
import texture from './santa.jpg';
import textureGreen from './santa-green.jpg';


export default function createSanta(green) {
  return createTexturizedObject(geometry, green ? textureGreen : texture);
}
