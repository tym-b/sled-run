import * as THREE from 'three';
import { memoize } from 'lodash';

const objectLoader = new THREE.JSONLoader();
const textureLoader = new THREE.TextureLoader();

export const loadObject = memoize(url => new Promise(resolve => objectLoader.load(url, resolve)));
export const parseObject = memoize(json => Promise.resolve(objectLoader.parse(json).geometry));
export const loadTexture = memoize(url => new Promise(resolve => textureLoader.load(url, resolve)));
