import * as THREE from 'three';
import { memoize } from 'lodash';

const objectLoader = new THREE.JSONLoader();
const textureLoader = new THREE.TextureLoader();

export const parseObject = memoize(json => Promise.resolve(objectLoader.parse(json).geometry));

export const loadTexture = memoize(url => new Promise(resolve => textureLoader.load(url, resolve)));

export const createTexturizedObject = async (objectJson, textureUrl) => {
  const [geometry, texture] = await Promise.all([parseObject(objectJson), loadTexture(textureUrl)]);
  const material = new THREE.MeshBasicMaterial({ map: texture });

  return new THREE.Mesh(geometry, material);
};

export const createGround = async (objectJson) => {
  const geometry = await parseObject(objectJson);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const mesh = new THREE.Mesh(geometry, material);

  mesh.renderOrder = -1;

  return mesh;
};
