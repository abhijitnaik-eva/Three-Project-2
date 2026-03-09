import * as THREE from 'three';
import { scene } from '../Core/Scene';


let originX = 0, originY = 0;
let width = 15, height = 30;
let width1 = 2, widthx = width - width1;
let thickness = 5;
let radius1 = 1.5, radius2 = 1, radius3 = 1;
let parentMesh = null;


const materialSettings = {
    color: '#ffe364',
    wireframe: false,
}
const child1MaterialData = {
    color: '#383838',
    wireframe: false,
}
const child2MaterialData = {
    color: '#ce4b4b',
    wireframe: false,
}
const extrudeSettings = {
    depth: thickness,
    bevelEnabled: false
}

export function createC2Extrude(newWidth1, newWidth, newHeight, newThickness, newRadius1, newRadius2, newRadius3) {
    

    deleteC2Shape();

    width1 = newWidth1
    width = newWidth
    height = newHeight
    thickness = newThickness
    radius1 = newRadius1
    radius2 = newRadius2
    radius3 = newRadius3
    widthx = width - width1;

    const parent = cutShapeParent();
    const child1 = cutShapeC1();
    const child2 = cutShapeC2();

    const parentMaterial = new THREE.MeshBasicMaterial(materialSettings);
    const parentGeometry = new THREE.ExtrudeGeometry(parent, extrudeSettings);
    parentMesh = new THREE.Mesh(parentGeometry, parentMaterial);
    parentMesh.add(getOutline(parentGeometry));

    const child1Material = new THREE.MeshBasicMaterial(child1MaterialData);
    const child1Geometry = new THREE.ExtrudeGeometry(child1, extrudeSettings);
    const child1Mesh = new THREE.Mesh(child1Geometry, child1Material);
    child1Mesh.add(getOutline(child1Geometry));
    child1Mesh.position.z = thickness;

    const child2Material = new THREE.MeshBasicMaterial(child2MaterialData);
    const child2Geometry = new THREE.ExtrudeGeometry(child2, extrudeSettings);
    const child2Mesh = new THREE.Mesh(child2Geometry, child2Material);
    child2Mesh.position.z = thickness;
    const pivotX = widthx / 2 + width1 + originX;
    const pivotY = 2 * height / 3 + originY;
    child2Geometry.translate(-pivotX, -pivotY, 0);
    child2Mesh.position.set(pivotX, pivotY, thickness);

    const len = Math.sqrt(Math.pow(height/3, 2) + Math.pow(widthx/2, 2));
    const angle = Math.asin((widthx/2)/len)
    child2Mesh.rotation.z = angle + Math.atan((widthx/2)/(height/3));
    child2Mesh.add(getOutline(child2Geometry));


    parentMesh.add(child1Mesh);
    parentMesh.add(child2Mesh);
    // parentMesh.rotation.z = Math.PI;
;    scene.add(parentMesh);
}

export function deleteC2Shape() {
    if (scene.children.includes(parentMesh)) scene.remove(parentMesh);
}
function cutShapeParent() {
    const parent = new THREE.Shape();
    parent.moveTo(width1 + originX, originY);
    parent.lineTo(widthx / 2 + width1 + originX, originY + height / 4);
    parent.lineTo(widthx + width1 + originX, originY);
    parent.lineTo(width + originX, height + originY);
    parent.absarc(width + originX, 2*height / 3 + originY, width, Math.PI / 2, Math.PI , false);
    parent.lineTo(width1 + originX, 2 * height / 3 + originY);
    parent.lineTo(width1 + originX, originY);


    const holeD = new THREE.Path();
    holeD.absarc(widthx / 2 + width1 + originX, 2 * height / 3 + originY, radius1, 0, Math.PI * 2, true);
    const holed1 = new THREE.Path();
    holed1.absarc(widthx / 4 + width1 + originX, height / 3 + originY, radius2, 0, Math.PI * 2, true);
    const holed2 = new THREE.Path();
    holed2.absarc(3 * widthx / 4 + width1 + originX, height / 3 + originY, radius3, 0, Math.PI * 2, true);

    parent.holes.push(holeD, holed1, holed2);
    return parent;
}

function cutShapeC1() {

    const child1 = new THREE.Shape();
    let x = (widthx/4 - height/12);
    child1.moveTo(widthx / 4 + width1 + originX - x, height / 4 + originY);
    child1.lineTo(3 * widthx / 4 + width1 + originX + x, height / 4 + originY);
    child1.absarc(3 * widthx / 4 + width1 + originX + x, height / 3 + originY, height / 12, 3 * Math.PI / 2, Math.PI / 2, false);
    child1.lineTo(widthx / 4 + width1 + originX - x, 5 * height / 12 + originY);
    child1.absarc(widthx / 4 + width1 + originX - x, height / 3 + originY, height / 12, Math.PI / 2, 3 * Math.PI / 2, false);
    child1.lineTo(widthx / 4 + width1 + originX - x, height / 4 + originY);

    const holed1 = new THREE.Path();
    holed1.absarc(widthx / 4 + width1 + originX, height / 3 + originY, radius2, 0, Math.PI * 2, false);
    const holed2 = new THREE.Path();
    holed2.absarc(3 * widthx / 4 + width1 + originX, height / 3 + originY, radius3, 0, Math.PI * 2, false);

    child1.holes.push(holed1, holed2);
    return child1;
}

function cutShapeC2() {

    let lengthOffset = 0;
    const child2 = new THREE.Shape();
    child2.moveTo(widthx / 4 + width1 + originX, height / 3 - lengthOffset + originY);
    child2.lineTo(width1 + originX, height / 3 - lengthOffset + originY);
    child2.lineTo(3 * widthx / 4 + width1 + originX, originY - lengthOffset);
    child2.lineTo(3 * widthx / 4 + width1 + originX, 2 * height / 3 + originY);
    child2.absarc(widthx / 2 + width1 + originX, 2 * height / 3 + originY, widthx / 4, 0, Math.PI, false);
    child2.lineTo(widthx / 4 + width1 + originX, height / 3 + originY);
    child2.lineTo(widthx / 4 + width1 + originX, height / 3 - lengthOffset + originY);

    const holeD = new THREE.Path();
    holeD.absarc(widthx / 2 + width1 + originX, 2 * height / 3 + originY, radius1, 0, Math.PI * 2, false);

    child2.holes.push(holeD);
    return child2;

}


function getOutline(geometry) {
    const edge = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineBasicMaterial({ color: 'black' })
    const outline = new THREE.LineSegments(edge, line);
    return outline;
}

const width1Input = document.getElementById('width1InputC2');
const widthInput = document.getElementById('widthInputC2');
const heightInput = document.getElementById('heightInputC2');
const radius1Input = document.getElementById('radius1InputC2');
const radius2Input = document.getElementById('radius2InputC2');
const radius3Input = document.getElementById('radius3InputC2');
const thicknessInput = document.getElementById('thicknessInputC2');
const updateBtnC2 = document.getElementById('updateBtnC2');

updateBtnC2.addEventListener('click', () => {
    const width1 = Number(width1Input.value);
    const width = Number(widthInput.value);
    const height = Number(heightInput.value);
    const radius1 = Number(radius1Input.value);
    const radius2 = Number(radius2Input.value);
    const radius3 = Number(radius3Input.value);
    const thickness = Number(thicknessInput.value);
    if (width1 === 0 || width === 0 || height === 0 || radius1 === 0 || radius2 === 0 || radius3 === 0 || thickness === 0) {
        alert("Please enter all numbers!");
        return;
    }

    createC2Extrude(width1, width, height, thickness, radius1, radius2, radius3);
});
