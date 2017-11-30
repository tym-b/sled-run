import * as THREE from 'three';

import { loadObject, loadTexture } from '../../../../utils';
import rockTexture from './rock.jpg';

const rockGeometry = require('file-loader!./rock.json');


export default async function createRock() {
  const [geometry, texture] = await Promise.all([loadObject(rockGeometry), loadTexture(rockTexture)]);
  const material = new THREE.MeshBasicMaterial({ map: texture });

  return new THREE.Mesh(geometry, material);
}
