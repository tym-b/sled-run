import * as CANNON from 'cannon';
import * as THREE from 'three';

const loader = new THREE.JSONLoader();

export default function objectToShape(json) {
  const { geometry } = loader.parse(json);
  const vertices = geometry.vertices.map(({ x, y, z }) => new CANNON.Vec3(x, y, z));
  const faces = geometry.faces.map(({ a, b, c }) => [a, b, c]);

  return new CANNON.ConvexPolyhedron(vertices, faces);
}
