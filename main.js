import * as THREE from 'three';
import {scene} from "./Core/Scene"
import { camera, changeCamera } from './Core/Camera';
import { renderer } from './Core/Renderer';
import { room } from './Geometry/Ground';
import { controls } from './Controls/OrbitControls';
import { ambientLight, changeLights } from './Core/Lights';
import { changeMaterial, changeMesh, mesh } from './Geometry/Geometries';

scene.add(ambientLight);
scene.add(room);
scene.add(mesh);


const keys = {};
window.addEventListener('keydown', (e) => (keys[e.key] = true));
window.addEventListener('keyup', (e) => (keys[e.key] = false));


function animate(){
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
    changeLights(keys);
    changeMesh(keys);
    changeMaterial(keys);
    changeCamera(keys);
    controls.camera = camera;
    controls.update();
    renderer.render(scene, camera);
}
renderer.setAnimationLoop( animate );