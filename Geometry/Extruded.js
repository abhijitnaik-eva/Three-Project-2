import * as THREE from 'three'
import { scene } from '../Core/Scene';

let height;
let width;
let thickness;
let radius;
export let extrudeMesh = null;
createExtrudeShape(10, 5, 1, 0.5)
export function createExtrudeShape(newWidth, newHeight, newThickness, newRadius) {

    if(!checkCondition(newWidth, newHeight, newRadius)){
        return;
    }

    if(scene.children.includes(extrudeMesh)){
        scene.remove(extrudeMesh);
    }

    height = newHeight;
    width = newWidth;
    thickness = newThickness;
    radius = newRadius;

    let shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(width, 0);
    shape.lineTo(width, height);
    shape.lineTo(0, height);
    shape.lineTo(0, 0);

    let hole1 = new THREE.Path();
    hole1.absarc(width / 4, height / 4, radius, 0, Math.PI * 2);

    let hole2 = new THREE.Path();
    hole2.absarc((width / 4) * 3, height / 4, radius, 0, Math.PI * 2);

    let hole3 = new THREE.Path();
    hole3.absarc((width / 4) * 3, (height / 4) * 3, radius, 0, Math.PI * 2);

    let hole4 = new THREE.Path();
    hole4.absarc(width / 4, (height / 4) * 3, radius, 0, Math.PI * 2);
    const holes = [hole1, hole2, hole3, hole4];
    shape.holes.push(...holes);

    let geometry = new THREE.ExtrudeGeometry(shape, { depth: thickness });

    let material = new THREE.MeshStandardMaterial({ color: '#514fdf', side:THREE.DoubleSide })

    let edges = new THREE.EdgesGeometry(geometry);
    let line = new THREE.LineBasicMaterial({ color: 'black' });
    let outline = new THREE.LineSegments(edges, line);
    extrudeMesh = new THREE.Mesh(geometry, material);
    extrudeMesh.add(outline);
    scene.add(extrudeMesh);

}

function checkCondition(newWidth, newHeight, newRadius){
    if(newRadius === 0) {
        alert("radius cannot be 0");
        return false;
    }
    else if(newRadius > width/4 || newRadius > height/4){
        alert("Input value between : " + newWidth/4 + " and " + newHeight/4 );
        return false;
    }
    else
        return true;
}

const widthInput = document.getElementById('widthInput');
const heightInput = document.getElementById('heightInput');
const radiusInput = document.getElementById('radiusInput');
const thicknessInput = document.getElementById('thicknessInput');
const updateBtn = document.getElementById('updateBtn');

updateBtn.addEventListener('click', () => {
    width = Number(widthInput.value);
    height = Number(heightInput.value);
    radius = Number(radiusInput.value);
    thickness = Number(thicknessInput.value);
    if(width === 0 || height == 0 || thickness === 0) {
        alert("Please enter all numbers!");
        return;
    }
    createExtrudeShape(width, height, thickness, radius);
});
