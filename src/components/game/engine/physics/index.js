import * as CANNON from 'cannon';


export default class Physics {
  constructor() {
    this.world = new CANNON.World();
    this.world.gravity.set(0, -9.82, -2);
    this.world.broadphase = new CANNON.NaiveBroadphase();

    const groundMaterial = new CANNON.Material('groundMaterial');
    const playerMaterial = new CANNON.Material('playerMaterial');

    this.world.addContactMaterial(new CANNON.ContactMaterial(groundMaterial, playerMaterial, {
      friction: 0,
      restitution: 0.3,
      contactEquationStiffness: 1e8,
      contactEquationRelaxation: 3,
    }));

    this.player = new CANNON.Body({
      mass: 5,
      position: new CANNON.Vec3(0, 10, 0),
      shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1)),
      material: playerMaterial,
    });
    this.world.addBody(this.player);

    this.ground = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Plane(),
      material: groundMaterial,
    });
    this.ground.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
    this.world.addBody(this.ground);
  }

  update() {
    this.world.step(1 / 60);
  }
}
