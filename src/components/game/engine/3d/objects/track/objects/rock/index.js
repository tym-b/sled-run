import { createTexturizedObject } from '../../../../utils';
import texture from './rock.jpg';
import geometry from './rock.json';


export default function createRock() {
  return createTexturizedObject(geometry, texture);
}
