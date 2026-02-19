import * as THREE from 'three';

//#region Geometries
const geometryBox = new THREE.BoxGeometry(2,2,2);
const geometrySphere = new THREE.SphereGeometry();
const geometryCone = new THREE.ConeGeometry();
const geometryCylinder = new THREE.CylinderGeometry();
const geometryCapsule = new THREE.CapsuleGeometry();
const geometryTetra = new THREE.TetrahedronGeometry();
const geometryOcta = new THREE.OctahedronGeometry();
const geometryDodeca = new THREE.DodecahedronGeometry();
const geometryTorusKnot = new THREE.TorusKnotGeometry();
export const mesh = new THREE.Mesh();
//#endregion

//#region Materials
const basicMaterial = new THREE.MeshBasicMaterial({ color : '#355872'})
const standardMaterial = new THREE.MeshStandardMaterial({ color : '#3754d6', roughness: 0, metalness: 0.5})
const physicalMaterial = new THREE.MeshPhysicalMaterial({ color : '#A82323', iridescence: 1, clearcoat: 0.5})
const phongMaterial = new THREE.MeshPhongMaterial({ color : '#61c049', shininess: 100})
const toonMaterial = new THREE.MeshToonMaterial({ color : '#049ef4'})
const lineDashedMaterial = new THREE.LineDashedMaterial({color: 0xffffff, scale: 1, dashSize: 3, gapSize: 1,})
const normalMaterial = new THREE.MeshNormalMaterial()

//#endregion

mesh.material = basicMaterial;
mesh.position.y = 4;
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
    if(keys['9']) mesh.geometry = geometryTorusKnot;
}

export function changeMaterial(keys){
    if(keys['[']) mesh.material = basicMaterial;
    if(keys[']']) mesh.material = standardMaterial;
    if(keys[';']) mesh.material = physicalMaterial;
    if(keys[':']) mesh.material = phongMaterial;
    if(keys['.']) mesh.material = toonMaterial;
    if(keys[',']) mesh.material = lineDashedMaterial;
    if(keys['?']) mesh.material = normalMaterial;
}
