import * as THREE from 'three';
import {scene} from "./Core/Scene"
import { camera } from './Core/Camera';
import { renderer } from './Core/Renderer';
import { room } from './Geometry/Ground';
import { controls } from './Controls/OrbitControls';
import { ambientLight, changeLights } from './Core/Lights';
import { changeMesh, mesh } from './Geometry/Geometries';

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
    controls.update();
    renderer.render(scene, camera);
}
renderer.setAnimationLoop( animate );