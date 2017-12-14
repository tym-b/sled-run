import * as CANNON from 'cannon';

import { material as groundMaterial } from './ground';
import { material as playerMaterial } from './player';
import { material as rockMaterial } from './track/objects/rock';
import { material as treeMaterial } from './track/objects/tree';
import { material as rampMaterial } from './track/objects/ramp';
import { material as stoneMaterial } from './track/objects/stone';


export default function createWorld() {
  const world = new CANNON.World();

  world.gravity.set(0, -50, 0);
  world.broadphase = new CANNON.NaiveBroadphase();

  world.addContactMaterial(new CANNON.ContactMaterial(groundMaterial, playerMaterial, {
    friction: 0,
    restitution: 0.2,
    contactEquationStiffness: 1e8,
    contactEquationRelaxation: 3,
  }));

  world.addContactMaterial(new CANNON.ContactMaterial(rockMaterial, playerMaterial, {
    friction: 0.005,
    restitution: 0.1,
  }));

  world.addContactMaterial(new CANNON.ContactMaterial(treeMaterial, playerMaterial, {
    friction: 0.002,
    restitution: 0.1,
  }));

  world.addContactMaterial(new CANNON.ContactMaterial(rampMaterial, playerMaterial, {
    friction: 0,
    restitution: 0,
  }));

  world.addContactMaterial(new CANNON.ContactMaterial(stoneMaterial, groundMaterial, {
    friction: 0.01,
    restitution: 0,
  }));

  return world;
}
