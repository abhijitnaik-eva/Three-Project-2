import * as THREE from 'three';

const geometry = new THREE.PlaneGeometry(25, 25);
const material = new THREE.MeshStandardMaterial({color: 'green', side: THREE.DoubleSide, metalness: 0.9 });
export const plane = new THREE.Mesh(geometry, material);
plane.rotation.x = Math.PI/2;
plane.receiveShadow = true;
