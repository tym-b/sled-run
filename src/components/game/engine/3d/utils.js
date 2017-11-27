import * as THREE from 'three';


const objectLoader = new THREE.JSONLoader();
const textureLoader = new THREE.TextureLoader();

export const loadObject = url => new Promise(resolve => objectLoader.load(url, resolve));
export const loadTexture = url => new Promise(resolve => textureLoader.load(url, resolve));
