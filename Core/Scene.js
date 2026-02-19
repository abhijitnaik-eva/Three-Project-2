import * as THREE from 'three';

export const scene = new THREE.Scene();

const loader = new THREE.TextureLoader()
const texture = loader.load('../backgroundTexture1.jpg');
//scene.background = texture;

scene.background = new THREE.Color('#eeeeee');
