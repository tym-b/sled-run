import * as CANNON from 'cannon';

import { material as groundMaterial } from './ground';
import { material as playerMaterial } from './player';


export default function createWorld() {
  const world = new CANNON.World();

  world.gravity.set(0, -9.82, -5);
  world.broadphase = new CANNON.NaiveBroadphase();

  world.addContactMaterial(new CANNON.ContactMaterial(groundMaterial, playerMaterial, {
    friction: 0,
    restitution: 0.3,
    contactEquationStiffness: 1e8,
    contactEquationRelaxation: 3,
  }));

  return world;
}
