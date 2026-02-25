import { ambientLight } from "./Core/Lights";
import { scene } from "./Core/Scene";
import { setProject } from "./main";
import { createGeometries } from "./Project-1/Geometries";
import { createRoom } from "./Project-1/Ground";
import { createAxesHelper } from "./Project-2/Extruded1";


document.getElementById("tutorial").hidden = true;
document.getElementById("info").hidden = true;

const extrudeContainer = document.getElementById('ExtrudeContainer');
const design9Container = document.getElementById('9DesignContainer');
const dashboard = document.getElementById('dashboard');



document.querySelectorAll('.project1').forEach(button => {
    button.addEventListener('click', () => {
        extrudeContainer.hidden = true;
        design9Container.hidden = false;
        dashboard.hidden = true;

        scene.clear();
        scene.add(ambientLight);
        createRoom();
        createGeometries();
        setProject(1);

        document.getElementById("tutorial").hidden = false;
        document.getElementById("info").hidden = false;
    });
});


document.querySelectorAll('.project2').forEach(button => {
    button.addEventListener('click', () => {
        dashboard.hidden = true;
        extrudeContainer.hidden = false;
        design9Container.hidden = true;

        scene.clear();
        scene.add(ambientLight);
    });
});
