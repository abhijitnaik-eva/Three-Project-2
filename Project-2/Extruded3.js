import * as THREE from 'three'
import { scene } from '../Core/Scene';
import { SUBTRACTION, Brush, Evaluator, INTERSECTION } from 'three-bvh-csg';
import { ThreeMFLoader } from 'three/examples/jsm/Addons.js';

let height = 5;
let width = 20;
let thickness = 5;
let cutAngle1;
let cutAngle2;
let width1 = 2;
let width2 = 2;
let height1 = 2.5;
let height2 = 2.5;
let result = null;

function createAxesHelper(){
    const axesHelper = new THREE.AxesHelper(10);
        axesHelper.position.set(-1,0, -(thickness/2 + 1))
        axesHelper.setColors('red', 'blue', 'green');
        scene.add(axesHelper)
}


//#region Cut Extruded
export function createCutExtrudeShapeE3(newWidth, newHeight, newThickness, newH1, newH2, newW1, newW2){

    if(!checkRulesAngleExE3(newWidth, newHeight, newThickness, newH1, newH2, newW1, newW2)) return;
    deleteCutExtrudeShapeE3();

    height = newHeight;
    width = newWidth;
    thickness = newThickness;
    width1 = newW1;
    width2 = newW2;
    height1 = newH1;
    height2 = newH2;


    const shape = createBoxShape(width, height);
    const geometry = new THREE.ExtrudeGeometry(shape, {bevelEnabled : true, depth : thickness});

    cutShape(geometry);
    
    const material = new THREE.MeshStandardMaterial({ color: '#514fdf', side: THREE.DoubleSide, transparent: false});
    result = new THREE.Mesh(geometry, material);

    const outline = getOutline(geometry);
    result.add(outline);
    scene.add(result);

}

function createBoxShape(width, height){
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(width, 0);
    shape.lineTo(width, height/2);
    shape.lineTo(0, height/2)
    shape.moveTo(width, height/2)
    shape.lineTo(width, height);
    shape.lineTo(0, height);
    shape.lineTo(0, height/2);
    shape.lineTo(0, 0);
    return shape;
}

function cutShape(geometry){

    // const vertices = new Float32Array(
    //     [
    //         0, 0, 0,
    //         width, 0, 0, 
    //         width, height2, 0,
    //         width, height, 0,
    //         0, height, 0,
    //         0, height2, 0,
            
    //     ]
    // )

    // const indices = [
    //     0,1,2,
    //     0,2,5,
    //     5,2,3,
    //     5,3,4,
    // ]

    // const arr = geometry.attributes.position.array;
    // const newArr = [...arr, ...vertices];

    // const ind = geometry.index ;
    // const newInd = [...ind, ...indices];

    // geometry.setAttribute('position', ...new THREE.BufferAttribute(newArr, 3));
    // geometry.setIndex(...newInd);


    const positionAttribute = geometry.attributes.position;
    

    const vertex = new THREE.Vector3(); 
    for( let i = 0; i<positionAttribute.count; i++){
        vertex.fromBufferAttribute(positionAttribute, i);
        if(vertex.z > thickness/2) {
            if(vertex.y !== height1) positionAttribute.setZ(i, thickness - width1);
            //if(vertex.y === height1) positionAttribute.setX(i, width1);
        }
        console.log(vertex);
        if(vertex.z < thickness/2){
            if(vertex.y !== height2) positionAttribute.setZ(i, width2);
        }
    }
    positionAttribute.needsUpdate = true;
    geometry.computeVertexNormals();
}

function getOutline(geometry){
    const edge = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineBasicMaterial({color:'black'})
    const outline = new THREE.LineSegments(edge, line);
    return outline;
}
export function deleteCutExtrudeShapeE3(){
    if(scene.children.includes(result)) scene.remove(result);
}


function checkRulesAngleExE3(newWidth, newHeight, newThickness, newH1, newH2, newW1, newW2){
    let minLength = newW1 + newW2;
    minLength = Math.floor(minLength);
    if(newWidth < minLength){
        alert("Length cannot be less than " + minLength);
        return false;
    }
    if(newH1 > newHeight || newH2 > newHeight){
        alert("H1 and H2 cannot be greater than " + newHeight);
        return false;
    }
    return true;
}
//#endregion


const widthInput = document.querySelector('.widthInputE3');
const heightInput = document.querySelector('.heightInputE3');
const thicknessInput = document.querySelector('.thicknessInputE3');
const h1Input = document.querySelector('.H1');
const h2Input = document.querySelector('.H2');
const w1Input = document.querySelector('.W1');
const w2Input = document.querySelector('.W2');

const updateBtnE3 = document.getElementById('updateBtnE3');

updateBtnE3.addEventListener('click', () => {
  const width = Number(widthInput.value);
  const height = Number(heightInput.value);
  const thickness = Number(thicknessInput.value);
  const h1 = Number(h1Input.value);
  const h2 = Number(h2Input.value);
  const w1 = Number(w1Input.value);
  const w2 = Number(w2Input.value);
  console.log(width , height, thickness, h1, h2, w1, w2)

  if (width === 0 || height === 0 || thickness === 0 || h1 === 0 || h2 === 0 || w1 === 0 || w2 === 0) {
    alert("Please enter all numbers!");
    return;
  }

  createCutExtrudeShapeE3(width, height, thickness, h1, h2, w1, w2);
});
