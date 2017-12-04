import * as THREE from 'three';

import { parseObject, loadTexture } from '../../../../utils';
import rockTexture from './rock.jpg';
import rockGeometry from './rock.json';


export default async function createRock() {
  const [geometry, texture] = await Promise.all([parseObject(rockGeometry), loadTexture(rockTexture)]);
  const material = new THREE.MeshBasicMaterial({ map: texture });

  return new THREE.Mesh(geometry, material);
}
