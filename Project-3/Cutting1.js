import * as THREE from 'three'
import { scene } from '../Core/Scene';


let mesh = null;
let width = 8, height = 8, segments = 100;
let width1 = 2, width2 = 2, height1 = 2, height2 = 2;
let originX = 0, originY = 0;

class Point {
    constructor(x, y, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

class Line {
    constructor(startPoint, endPoint) {
        this.startPoint = startPoint;
        this.endPoint = endPoint;
    }

    getSlope() {
        const rise = this.endPoint.y - this.startPoint.y;
        const run = this.endPoint.x - this.startPoint.x;
        this.slope = rise / run;
        return this.slope;
    }

    getIntercept() {
        this.c = this.startPoint.y - (this.slope * this.startPoint.x);
        return this.c;
    }

}


const materialSetting = {
        color: '#f75c70',
        wireframe: false,
    }

const extrudeSettings = {
    bevelEnabled: false,
    depth: 5,
}



export function createC1Extrude() {
    

    // if (!checkRulesAngleEx(newWidth, newHeight, newThickness, newCutAngle1, newCutAngle2)) return;
    deleteC1Shape();

    const lines1 = [
        new Line(new Point(2, 0), new Point(-2, 4)),
        new Line(new Point(-2, 4), new Point(2, 8)),
    ]
    const lines2 = [
        new Line(new Point(6, 0), new Point(10, 4)),
        new Line(new Point(10, 4), new Point(6, 8))
    ]
    const shape = createShape();

    const material = new THREE.MeshBasicMaterial(materialSetting);
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

    const extrudeData = {
        edge1: lines1,
        edge2: lines2,
    }

    cutShape(geometry, extrudeData);
    mesh = new THREE.Mesh(geometry, material);
    const outline = getOutline(geometry);
    mesh.add(outline);
    scene.add(mesh);
}

export function deleteC1Shape(){
    if(scene.children.includes(mesh)) scene.remove(mesh);
}

function createShape() {
    
    const shape = new THREE.Shape();
    shape.moveTo(originX, originY);
    for (let i = 1; i <= segments; i++) {
        shape.lineTo((i / segments) * width, originY);
    }
    for (let i = 1; i <= segments; i++) {
        shape.lineTo(width, (i / segments) * height);
    }
    for (let i = segments - 1; i >= 0; i--) {
        shape.lineTo((i / segments) * width, height);
    }
    for (let i = segments - 1; i >= 0; i--) {
        shape.lineTo(originX, (i / segments) * height);
    }
    return shape;

}



function cutShape(geometry, extrudeData) {
    const positionAttribute = geometry.attributes.position;
    const vertex = new THREE.Vector3();
    for (let i = 0; i < positionAttribute.count; i++) {
        vertex.fromBufferAttribute(positionAttribute, i);
        let x = vertex.x;
        let y = vertex.y;
        let z = vertex.z;

        if (x === 0) {
            for (let line of extrudeData.edge1) {
                const m = line.getSlope();
                const c = line.getIntercept();

                const lowerLimit = line.startPoint.y;
                const upperLimit = line.endPoint.y;
                if (y >= lowerLimit && y <= upperLimit) {
                    const newX = (y - c) / m;
                    positionAttribute.setX(i, newX);
                }
            }
        }


        if(x === width){
            for (let line of extrudeData.edge2) {
                const m = line.getSlope();
                const c = line.getIntercept();

                const lowerLimit = line.startPoint.y;
                const upperLimit = line.endPoint.y;
                if (y >= lowerLimit && y <= upperLimit) {
                    const newX = (y - c) / m;
                    positionAttribute.setX(i, newX);
                }
            }
        }

        if(y === height){
            let left = extrudeData.edge1[extrudeData.edge1.length-1].endPoint.x;
            let right = extrudeData.edge2[extrudeData.edge2.length-1].endPoint.x;
            if(x < left) positionAttribute.setX(i, left);
            if(x > right) positionAttribute.setX(i, right);
        }
        if(y === originY){
            let left = extrudeData.edge1[0].startPoint.x;
            let right = extrudeData.edge2[0].startPoint.x;
            if(x < left) positionAttribute.setX(i, left);
            if(x > right) positionAttribute.setX(i, right);
        }

    }
    positionAttribute.needsUpdate = true;
    geometry.computeVertexNormals();
}

function getOutline(geometry) {
    const edge = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineBasicMaterial({ color: 'black' })
    const outline = new THREE.LineSegments(edge, line);
    return outline;
}

