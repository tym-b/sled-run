import * as THREE from 'three';
import { memoize } from 'lodash';

THREE.ShaderLib.lambert.fragmentShader = THREE.ShaderLib.lambert.fragmentShader.replace(
  'vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;',
  `#ifndef BASIC
      vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
  #else
      float shadowLevel = 0.38 * (1.0 - getShadowMask());
      vec3 outgoingLight = mix(diffuseColor.rgb * (1.0 - shadowLevel), vec3(0.0, 0.8, 1.0), 0.3 * shadowLevel);
  #endif`
);

class MeshBasicMaterialWithShadow extends THREE.MeshLambertMaterial {
  constructor(params) {
    super(params);
    this.defines = { ...this.defines, BASIC: '' };
  }
}

const objectLoader = new THREE.JSONLoader();
const textureLoader = new THREE.TextureLoader();

export const parseObject = memoize(json => Promise.resolve(objectLoader.parse(json).geometry));

export const loadTexture = memoize(url => new Promise(resolve => textureLoader.load(url, resolve)));

export const createTexturizedObject = async (objectJson, textureUrl) => {
  const [geometry, texture] = await Promise.all([parseObject(objectJson), loadTexture(textureUrl)]);
  const material = new MeshBasicMaterialWithShadow({ map: texture });
  const mesh = new THREE.Mesh(geometry, material);

  mesh.receiveShadow = true;

  return mesh;
};

export const createGround = async (objectJson) => {
  const geometry = await parseObject(objectJson);
  const material = new MeshBasicMaterialWithShadow({ color: 0xffffff });
  const mesh = new THREE.Mesh(geometry, material);

  mesh.receiveShadow = true;
  mesh.renderOrder = -1;

  return mesh;
};
