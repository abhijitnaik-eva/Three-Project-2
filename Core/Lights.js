import * as THREE from 'three';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/Addons.js';
import { scene } from './Scene';

export const ambientLight = new THREE.AmbientLight('white', 10);

const directionalLight = new THREE.DirectionalLight('white', 5);
directionalLight.position.set(10, 20, 10)
directionalLight.castShadow = true;
directionalLight.lookAt(0, 0, 0);
const dirLightHelper = new THREE.DirectionalLightHelper(directionalLight, 2, 'red');

const pointLight = new THREE.PointLight('white', 200, 10);
const pointLightHelper = new THREE.PointLightHelper(pointLight, 5, 'yellow');
pointLight.position.set(2.5, 5, 0);
pointLight.castShadow = true;


const spotLight = new THREE.SpotLight('white', 100, 10, Math.PI / 4);
const spotLighthelper = new THREE.SpotLightHelper(spotLight, 'red');
spotLight.position.set(0, 20, 0); 
spotLight.castShadow = true;


const hemisphereLight = new THREE.HemisphereLight('white', 'blue', 35);
hemisphereLight.position.set(0, 10, 0);

RectAreaLightUniformsLib.init();
const rectAreaLight = new THREE.RectAreaLight('white', 20, 10, 5);
rectAreaLight.position.set(0, 20, 0);
rectAreaLight.lookAt(0, 0, 0);


export function changeLights(keys) {
    if (keys["x"]) {
        removeLights();
    }
    if (keys["a"]) {
        scene.add(ambientLight);
    }
    if (keys["d"]) {
        scene.add(directionalLight);
        scene.add(dirLightHelper);
    }
    if (keys["r"]) {
        scene.add(rectAreaLight);
    }
    if (keys["p"]) {
        scene.add(pointLight);
        scene.add(pointLightHelper);
    }
    if (keys["s"]) {
        scene.add(spotLight);
        scene.add(spotLighthelper);
    }
    if (keys["h"]) {
        scene.add(hemisphereLight);
    }

}

function removeLights() {
    //#region Lights
    scene.remove(directionalLight);
    scene.remove(ambientLight);
    scene.remove(pointLight);
    scene.remove(spotLight);
    scene.remove(rectAreaLight);
    scene.remove(hemisphereLight);
    //#endregion 

    //#region Light Helpers
    scene.remove(dirLightHelper);
    scene.remove(pointLightHelper);
    scene.remove(spotLighthelper);
    //#endregion
}

export function changeLightsBtn(type){
    switch(type){
    case 'ambient': 
        scene.add(ambientLight); 
    break;
    case 'directional': 
        scene.add(directionalLight); 
        scene.add(dirLightHelper);
    break;
    case 'spot': 
        scene.add(spotLight); 
        scene.add(spotLighthelper);
    break;
    case 'point': 
        scene.add(pointLight); 
        scene.add(pointLightHelper);
    break;
    case 'rect': 
        scene.add(rectAreaLight);
    break;
    case 'removeLights': removeLights(); 
    break;
}
}