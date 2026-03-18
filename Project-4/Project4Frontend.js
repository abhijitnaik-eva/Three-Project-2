
import { createLine } from "./Section";
import { createWindow, globalFrame, globalSegments, setHandle } from "./Visualization";
import * as THREE from 'three';


export let lineHandlePosition = null;
export let lineHandleGHH = null;


//#region sectioning
// TEST3 FRONTEND
const T1Width = document.getElementById("T1WindowW");
const T1Height = document.getElementById("T1WindowH");

const updateBtnT1 = document.getElementById("updateBtnT1");

updateBtnT1.addEventListener("click", () => {
    const scaleDiv = 1;
    const width = Number(T1Width.value) / scaleDiv;
    const height = Number(T1Height.value) / scaleDiv;

    if (
        width === 0 &&
        height === 0
    ) {
        alert("Please enter valid numbers!");
        return;
    }
    
    createLine(width, height);
});
//#endregion


//#region visual
//FRONTEND
const T2WindowW = document.getElementById('T2WindowW');
const T2WindowH = document.getElementById('T2WindowH');
const T2FrameW = document.getElementById('T2FrameW');
const T2FrameH = document.getElementById('T2FrameH');
const T2FrameW1 = document.getElementById('T2FrameW1');
const T2FrameH1 = document.getElementById('T2FrameH1');
const T2BeadW = document.getElementById('T2BeadW');
const T2BeadH = document.getElementById('T2BeadH');

const updateBtnT2 = document.getElementById('updateBtnT2');

updateBtnT2.addEventListener('click', () => {

    const scale = 10;
    const windowW = Number(T2WindowW.value) / scale;
    const windowH = Number(T2WindowH.value) / scale;
    const frameW = Number(T2FrameW.value) / scale;
    const frameH = Number(T2FrameH.value) / scale;
    const frameW1 = Number(T2FrameW1.value) / scale;
    const frameH1 = Number(T2FrameH1.value) / scale;
    const beadW = Number(T2BeadW.value) / scale;
    const beadH = Number(T2BeadH.value) / scale;

    if (
        windowW === 0 &&
        windowH === 0 &&
        frameW === 0 &&
        frameH === 0 &&
        frameW1 === 0 &&
        frameH1 === 0 &&
        beadW === 0 &&
        beadH === 0

    ) {
        alert("Please enter all numbers!");
        return;
    }


    createWindow(windowW, windowH, frameW, frameH, frameW1, frameH1, beadW, beadH);
});
//#endregion


//#region hardware
// TEST3 FRONTEND
const ghhInput = document.getElementById("ghh");
const T3Width = document.getElementById("T3Width");
const T3Height = document.getElementById("T3Height");

const positionSelect = document.getElementById("T3Position");
const orientationSelect = document.getElementById("T3Orientation");
const viewSelect = document.getElementById('T3View');

const updateBtnT3 = document.getElementById("updateBtnT3");

updateBtnT3.addEventListener("click", () => {
    const scaleDiv = 10;
    let ghh = Number(ghhInput.value);
    let width = Number(T3Width.value);
    let height = Number(T3Height.value);

    const position = positionSelect.value;
    const orientation = orientationSelect.value;
    const view = viewSelect.value;

    
    if(width === 0) width = 40;
    if(height === 0) height = 150;

    let depth =5, scale = 0.2, pos = new THREE.Vector3(0,0,0);

    if(!globalSegments || !globalFrame) return;

    lineHandlePosition = position;
    lineHandleGHH = ghh;
    setHandle(globalSegments, globalFrame, ghh, width, height, depth, scale, position, orientation, view);
    
});
//#endregion


