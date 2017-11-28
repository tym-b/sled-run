import * as THREE from 'three';

import { loadObject, loadTexture } from '../../utils';
import rockGeometry from './rock.json';
import rockTexture from './rock.jpg';


export default async function createrock() {
  const [geometry, texture] = await Promise.all([loadObject(rockGeometry), loadTexture(rockTexture)]);
  const material = new THREE.MeshBasicMaterial({ map: texture });

  return new THREE.Mesh(geometry, material);
}
