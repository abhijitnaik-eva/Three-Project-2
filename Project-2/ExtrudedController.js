import { createAxesHelper, createExtrudeShape, deleteExtrudeShape, removeAxesHelper } from "./Extruded1";
import { createCutExtrudeShape, deleteCutExtrudeShape } from "./Extruded2";
import { createCutExtrudeShapeE3, deleteCutExtrudeShapeE3 } from "./Extruded3";
import { createExtrudeE4, deleteShapeE4 , deleteLines, createLight} from "./Extruded4";
import { createExtrudeE5, deleteShapeE5 } from "./Extruded5";

const extrudeE1 = document.getElementById('ExtrudeE1');
const extrudeE2 = document.getElementById('ExtrudeE2');
const extrudeE3 = document.getElementById('ExtrudeE3');
const extrudeE4 = document.getElementById('ExtrudeE4');
const extrudeE5 = document.getElementById('ExtrudeE5')

const subsectionE2 = document.getElementById('subsectionE2')
const subsectionE5 = document.getElementById('subsectionE5')

const panels = {
    extrudeE1,
    extrudeE2,
    extrudeE3,
    extrudeE4,
    extrudeE5
};
const subsections = {
    subsectionE2,
    subsectionE5
}

function hideAllPanels() {
    Object.values(panels).forEach(panel => panel.hidden = true);
}

function hideAllSubsections() {
    Object.values(subsections).forEach(sub => sub.hidden = true);
}

function resetScene() {
    removeAxesHelper();
    deleteLines();
    deleteExtrudeShape();
    deleteCutExtrudeShape();
    deleteCutExtrudeShapeE3();
    deleteShapeE4();
    deleteShapeE5();
    createLight(false);
}

const actions = {
    E1: () => {
        createAxesHelper();
        panels.extrudeE1.hidden = false;
        createExtrudeShape(10, 5, 1, 0.5);
    },

    E2: () => {
        createAxesHelper();
        panels.extrudeE2.hidden = false;
        createCutExtrudeShape(5,5,15,45,135);
        subsections.subsectionE2.hidden = false;
    },

    E3: () => {
        createAxesHelper();
        panels.extrudeE3.hidden = false;
        createCutExtrudeShapeE3(8,4,20,2,2,2,2,45,135);
    },

    E4: () => {
        createLight(true);
        panels.extrudeE4.hidden = false;
        createExtrudeE4(32,32,4,4,8);
    },

    E5: () => {
        createAxesHelper();
        panels.extrudeE5.hidden = false;
        createExtrudeE5(8,6,10,2);
        subsections.subsectionE5.hidden = false;
    }
};



Object.keys(actions).forEach(id => {
    document.getElementById(id).addEventListener("click", () => {
        resetScene();
        hideAllPanels();
        hideAllSubsections();
        actions[id]();
    });
});