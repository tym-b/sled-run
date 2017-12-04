import * as CANNON from 'cannon';

import { material as groundMaterial } from './ground';
import { material as playerMaterial } from './player';
import { material as rockMaterial } from './track/objects/rock';


export default function createWorld() {
  const world = new CANNON.World();

  world.gravity.set(0, -100, 0);
  world.broadphase = new CANNON.NaiveBroadphase();

  world.addContactMaterial(new CANNON.ContactMaterial(groundMaterial, playerMaterial, {
    friction: 0,
    restitution: 0.3,
    contactEquationStiffness: 1e8,
    contactEquationRelaxation: 3,
  }));

  world.addContactMaterial(new CANNON.ContactMaterial(rockMaterial, playerMaterial, {
    friction: 0.005,
    restitution: 0.2,
  }));

  return world;
}
