import * as THREE from 'three';

export const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;
camera.position.y = 10;
camera.rotation.x = Math.PI/4;
