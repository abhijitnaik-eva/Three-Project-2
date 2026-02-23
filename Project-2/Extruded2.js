import * as THREE from 'three'
import { scene } from '../Core/Scene';
import { SUBTRACTION, Brush, Evaluator, INTERSECTION } from 'three-bvh-csg';

let height;
let width;
let thickness;
let cutAngle1;
let cutAngle2;
let result = null;

createAxesHelper();
// createCutExtrudeShape(12,5,5,45,135)

function createAxesHelper(){
    const axesHelper = new THREE.AxesHelper(10);
    axesHelper.position.set(-1,0,-1)
    axesHelper.setColors('red', 'blue', 'green');
    scene.add(axesHelper)
}


//#region Cut Extruded
export function createCutExtrudeShape(newWidth, newHeight, newThickness, newCutAngle1, newCutAngle2){

    if(!checkRulesAngleEx(newWidth, newHeight, newThickness, newCutAngle1, newCutAngle2)) return;
    deleteCutExtrudeShape();

    height = newHeight;
    width = newWidth;
    thickness = newThickness;
    cutAngle1 = newCutAngle1;
    cutAngle2 = newCutAngle2;
    
    const shape = new THREE.Shape();
    shape.moveTo(0,0);
    shape.lineTo(width, 0);
    shape.lineTo(width - height/Math.tan((Math.PI - cutAngle2)*(Math.PI/180)),height)
    shape.lineTo(height/Math.tan(cutAngle1*(Math.PI/180)), height)
    shape.lineTo(0, 0);

    let geometry = new THREE.ExtrudeGeometry(shape, { depth: thickness, bevelEnabled: false });
    let material = new THREE.MeshStandardMaterial({ color: '#514fdf', side:THREE.DoubleSide })

   
    // const cutExtrudeMesh = new THREE.Mesh(geometry, material);
    // cutExtrudeMesh.add(outline);
    // scene.add(cutExtrudeMesh);

    const box = new THREE.BoxGeometry(width, height, thickness);
    
    const brush1 = new Brush( box );
    brush1.position.set(width/2, height/2, thickness/2);
    brush1.updateMatrixWorld();

    const brush2 = new Brush( geometry);
    brush2.updateMatrixWorld();

    const evaluator = new Evaluator();
    result = evaluator.evaluate( brush1, brush2, INTERSECTION );

     let edges = new THREE.EdgesGeometry(result.geometry);
    let line = new THREE.LineBasicMaterial({ color: 'black' });
    let outline = new THREE.LineSegments(edges, line);

    result.material = material;
    result.add(outline);

    // scene.add(brush1);
    // scene.add(brush2);
    scene.add(result);

}



export function deleteCutExtrudeShape(){
    if(scene.children.includes(result)) scene.remove(result);
}


function checkRulesAngleEx(newWidth, newHeight, newThickness, newCutAngle1, newCutAngle2){
    let minLength = newHeight/Math.tan(newCutAngle1*Math.PI/180) + newHeight/Math.tan((180-newCutAngle2)*Math.PI/180);
    console.log("minLength " + minLength);
    minLength = Math.floor(minLength);
    if(newWidth < minLength){
        alert("Length cannot be less than " + minLength);
        return false;
    }
    let minAngle = Math.atan(newHeight/(newWidth/2))
    if(minAngle * 2 > (newCutAngle1 + newCutAngle2)){
        alert("Sum of angles must be <= " + minLength * 2);
        return false;
    }
    return true;
}
//#endregion


const widthInput = document.querySelector('.widthInput');
const heightInput = document.querySelector('.heightInput');
const thicknessInput = document.querySelector('.thicknessInput');
const cut1Input = document.querySelector('.cutInput1');
const cut2Input = document.querySelector('.cutInput2');

const updateBtnE2 = document.getElementById('updateBtnE2');

updateBtnE2.addEventListener('click', () => {
  const width = Number(widthInput.value);
  const height = Number(heightInput.value);
  const thickness = Number(thicknessInput.value);
  const cut1 = Number(cut1Input.value)
  const cut2 = Number(cut2Input.value)

  if (width === 0 || height === 0 || thickness === 0) {
    alert("Please enter all numbers!");
    return;
  }

  createCutExtrudeShape(width, height, thickness, cut1, cut2);
});
