import * as THREE from 'three';
import { scene } from './Scene';


const far = 1000000;
const near = 0.001;
//#region Perspective Camera
const perspectiveCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.001, far);
perspectiveCamera.position.z = 10;
perspectiveCamera.position.y = 10;
perspectiveCamera.rotation.x = Math.PI/4;
//#endregion

//#region Orthographic Camera
const width = 30, height = 30;
const aspect = window.innerWidth / window.innerHeight;
const orthographicCamera = new THREE.OrthographicCamera(
    -width/2 * aspect, width/2 * aspect,
    height/2, -height/2,
    near, far);
orthographicCamera.position.set(50, 50, far/2);
orthographicCamera.lookAt(0, 0, 0);
//#endregion


export let camera = new THREE.Camera()
camera = orthographicCamera;

const cameraText = document.getElementById('cameraInfo')
updateCameraText();

export function changeCamera(keys){
    if(keys['-']) {
        camera = perspectiveCamera;
    }
    if(keys['=']) {
        camera = orthographicCamera;
    }
    updateCameraText();
}

export function changeCameraBtn(type){
    switch(type) {
        case 'perspective' : camera = perspectiveCamera; break;
        case 'orthographic' : camera = orthographicCamera; break;
    }
    updateCameraText();
}

function updateCameraText(){
cameraText.textContent = camera.type;
}