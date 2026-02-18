import * as THREE from 'three';
import {scene} from "./Core/Scene"
import { camera } from './Core/Camera';
import { renderer } from './Core/Renderer';
import { plane } from './Geometry/Ground';
import { controls } from './Controls/OrbitControls';
import { ambientLight, changeLights, directionalLight, dirLightHelper } from './Core/Lights';
import { changeMesh, mesh } from './Geometry/Geometries';


scene.add(plane);
scene.add(mesh);

const keys = {};
window.addEventListener('keydown', (e) => (keys[e.key] = true));
window.addEventListener('keyup', (e) => (keys[e.key] = false));


function animate(){

    changeLights(keys);
    changeMesh(keys);
    controls.update();
    renderer.render(scene, camera);
}
renderer.setAnimationLoop( animate );