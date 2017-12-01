import * as CANNON from 'cannon';
import * as THREE from 'three';

const loader = new THREE.JSONLoader();

export default function objectToShape(json) {
  const { geometry } = loader.parse(json);
  const vertices = geometry.vertices.map(({ x, y, z }) => new CANNON.Vec3(x, y, z));
  const faces = geometry.faces.map(({ a, b, c }) => {
    const va = geometry.vertices[a];
    const vb = geometry.vertices[b];
    const vc = geometry.vertices[c];
    const ab = vb.clone().sub(va);
    const cb = vc.clone().sub(vb);
    const normal = cb.cross(ab).normalize().negate();

    if (normal.dot(va) < 0) {
      return [a, c, b];
    }

    return [a, b, c];
  });

  return new CANNON.ConvexPolyhedron(vertices, faces);
}
