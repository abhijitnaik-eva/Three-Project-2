import * as THREE from 'three';

const geometryBox = new THREE.BoxGeometry(2,2,2);
const geometrySphere = new THREE.SphereGeometry();
const geometryCone = new THREE.ConeGeometry();
const geometryCylinder = new THREE.CylinderGeometry();
const geometryCapsule = new THREE.CapsuleGeometry();
const geometryTetra = new THREE.TetrahedronGeometry();
const geometryOcta = new THREE.OctahedronGeometry();
const geometryDodeca = new THREE.DodecahedronGeometry();
const geometryIcosa = new THREE.IcosahedronGeometry();

const material = new THREE.MeshStandardMaterial({color : 'red'});

export const mesh = new THREE.Mesh();
mesh.material = material;
mesh.position.y = 3;
mesh.castShadow = true;

export function changeMesh(keys){
    if(keys['0']) mesh.geometry = new THREE.BufferGeometry();
    if(keys['1']) mesh.geometry = geometryBox;
    if(keys['2']) mesh.geometry = geometrySphere;
    if(keys['3']) mesh.geometry = geometryCone;
    if(keys['4']) mesh.geometry = geometryCylinder;
    if(keys['5']) mesh.geometry = geometryCapsule;
    if(keys['6']) mesh.geometry = geometryTetra;
    if(keys['7']) mesh.geometry = geometryOcta;
    if(keys['8']) mesh.geometry = geometryDodeca;
    if(keys['9']) mesh.geometry = geometryIcosa;
}

