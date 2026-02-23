import { createExtrudeShape, deleteExtrudeShape } from "./Extruded1";
import { createCutExtrudeShape, deleteCutExtrudeShape } from "./Extruded2";

const dimensions = document.getElementById('dimensions');
const dimensionsCut = document.getElementById('dimensionsCut');

document.getElementById('E1').addEventListener('click', () => {
    dimensions.hidden = false;
    dimensionsCut.hidden = true;
    deleteCutExtrudeShape();
    createExtrudeShape(10, 5, 1, 0.5)
});

document.getElementById('E2').addEventListener('click', () => {
    dimensions.hidden = true;
    dimensionsCut.hidden = false;
    deleteExtrudeShape();
    createCutExtrudeShape(12,5,5,45,135)
});