import * as THREE from 'three';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/Addons.js';
import { scene } from './Scene';

export const ambientLight = new THREE.AmbientLight('white');

export const directionalLight = new THREE.DirectionalLight('white', 1);
directionalLight.position.y = 5;
directionalLight.castShadow = true;
export const dirLightHelper = new THREE.DirectionalLightHelper(directionalLight, 2, 'red');

const pointLight = new THREE.PointLight('white', 200, 10);
pointLight.position.y = 5;
pointLight.castShadow = true;

const spotLight = new THREE.SpotLight('white', 100, 10, Math.PI/4);
const spotLighthelper = new THREE.SpotLightHelper(spotLight, 'red');
spotLight.position.set(0,80,0);
spotLight.castShadow = true;

const hemisphereLight = new THREE.HemisphereLight('white', 'blue', 35);
hemisphereLight.position.set(0,10,0);

RectAreaLightUniformsLib.init();
const rectAreaLight = new THREE.RectAreaLight('white', 20, 10, 5);
rectAreaLight.position.set(0, 20, 0);
rectAreaLight.lookAt(0, 0, 0);
 
scene.add(ambientLight);
scene.add(spotLight);
//scene.add(spotLighthelper);
//scene.add(dirLightHelper);

export function changeLights(keys){
    if(keys["x"]) {
        scene.remove(directionalLight);

    }
    if(keys["a"]) {
        scene.add(ambientLight);
    }
    if(keys["d"]) {
        scene.add(directionalLight); 
    }
    if(keys["r"]) {
        scene.add(rectAreaLight); 
    }
    if(keys["p"]) {
        scene.add(pointLight);
    }
    if(keys["s"]) {
        scene.add(spotLight);
    }  

}

function removeLights(){
    scene.remove(ambientLight);
    scene.remove(directionalLight);
    scene.remove(pointLight);
    scene.remove(spotLight);
    scene.remove(rectAreaLight);
}