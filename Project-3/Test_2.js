import * as THREE from 'three';
import { camera } from '../Core/Camera';
import { scene } from '../Core/Scene';

// export function createExtrudedSquare(length = 200, size = 0.2) {
//     camera.position.z = 200;

//     const height = 50;
//     const shape = new Frame(30, 50, 20, 30).getShape();
//     //const shape = new Bead().getShape();
//     const half = length / 2


//     const p1 = new THREE.Vector3(-half, -half, 0)
//     const p2 = new THREE.Vector3(half, -half, 0)
//     const p3 = new THREE.Vector3(half, half, 0)
//     const p4 = new THREE.Vector3(-half, half, 0)



//     const path = new THREE.CurvePath()
//     path.add(new THREE.LineCurve3(p1, p2))
//     path.add(new THREE.LineCurve3(p2, p3))
//     path.add(new THREE.LineCurve3(p3, p4))
//     path.add(new THREE.LineCurve3(p4, p1))

//     const extrudeSettings = {
//         steps: 4 * 1,
//         extrudePath: path
//     }

//     const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
//     const material = new THREE.MeshBasicMaterial({ color: '#1b99ff', wireframe: false })
//     const mesh = new THREE.Mesh(geometry, material)
//     const outline = getOutline(geometry);
//     mesh.add(outline);

//     return mesh
// }



const COLORS = {
    frame: {
        default: '#ffffff',
        category: '#1b50ff',
        segment: '#7797ff'
    },
    bead: {
        default: '#ffffff',
        category: '#1b50ff',
        segment: '#7797ff'
    }
}

const selectableMeshes = []
let group = null;
let dirLight = null;



export function createWindow(width, height, frameW, frameH, frameW1, frameH1, beadW, beadH) {

    disposeWindow();

    if(!dirLight){
        dirLight = new THREE.DirectionalLight(0xffffff,1)
        dirLight.position.set(100,100,100)
        dirLight.lookAt(0,0,0);
        scene.add(dirLight)
    }

    camera.rotation.set(0, 0, 0);
    camera.position.z = Math.max(width, height)

    //Invalid Inputs handling
    const frameLW = 1;
    if (width === 0) width = 50;
    if (height === 0) height = 50;
    if (frameW === 0) frameW = 6.0;
    if (frameH === 0) frameH = 6.0;
    if (frameW1 === 0) frameW1 = frameW - frameLW;
    if (frameH1 === 0) frameH1 = frameH - 2.0;
    if (beadW === 0) beadW = 2.0
    if (beadH === 0) beadH = frameH - frameH1;

    const points = [
        new Point(0, 0),
        new Point(width, 0),
        new Point(width, height),
        new Point(0, height)
    ]

    const path = new PolygonPath(points)
    const segments = path.getSegments()


    const frame = new Frame(frameW, frameH, frameW1, frameH1);
    const bead = new Bead(beadW, beadH)

    const loader = new THREE.TextureLoader();
    const woodTexture = loader.load("Images/Textures/Wood088/Wood088_1K-JPG_Color.jpg");
    woodTexture.wrapS = THREE.RepeatWrapping;
    woodTexture.wrapT = THREE.RepeatWrapping;
    woodTexture.repeat.set(0.1, 0.1);

    const woodMaterial = new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        map: woodTexture,
    });

    const framePolygon = new Polygon(frame, segments, 0, COLORS.frame.default, "frame", 45, 135, woodMaterial)
    const beadPolygon = new Polygon(bead, segments, frame.h1, COLORS.bead.default, "bead", 90, 90, woodMaterial)

    const GVA = 0.1, GHA = 0.1;
    const glass = new Glass(width - 2 * frame.h1 - GVA, height - 2 * frame.h1 - GHA).getMesh()
    glass.position.set(width / 2, height / 2, -frame.width / 2);

    const comp1 = framePolygon.create();
    const comp2 = beadPolygon.create();

    group = new THREE.Group()
    group.add(comp1)
    group.add(comp2)
    group.add(glass);

    new RaySystem(camera)

    group.position.set(-width / 2, -height / 2);
    scene.add(group);
}

export function disposeWindow() {
    if (scene.children.includes(group)) scene.remove(group);
    selectableMeshes.length = 0;
}


class Point {
    constructor(x, y, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

class Line {
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
    }

    length2() {
        const dx = this.p2.x - this.p1.x;
        const dy = this.p2.y - this.p1.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    length3() {
        const dx = this.p2.x - this.p1.x;
        const dy = this.p2.y - this.p1.y;
        const dz = this.p2.z - this.p1.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }

    angle() {
        const dx = this.p2.x - this.p1.x;
        const dy = this.p2.y - this.p1.y;
        return Math.atan2(dy, dx);
    }
}

class Glass {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    getMesh() {
        const geometry = new THREE.BoxGeometry(this.width, this.height, 1);
        const material = new THREE.MeshPhysicalMaterial({ color: '#c4e5ff', transmission: 1, roughness: 0, metalness: 0, clearcoat: 1, emissive: 'black', specular: 'white' });
        return new THREE.Mesh(geometry, material);
    }
}

class Frame {
    constructor(width, height, w1, h1) {
        this.width = width
        this.height = height
        this.w1 = w1
        this.h1 = h1
    }

    getShape() {
        const shape = new THREE.Shape()
        shape.moveTo(0, 0)
        shape.lineTo(this.width, 0)
        shape.lineTo(this.width, this.height)
        shape.lineTo(this.w1, this.height)
        shape.lineTo(this.w1, this.h1)
        shape.lineTo(0, this.h1)
        shape.lineTo(0, 0);
        return shape;
    }

    texture() {

    }
}

class Bead {

    constructor(width, height) {

        this.width = width
        this.height = height

    }

    getShape() {
        const shape = new THREE.Shape()
        const w1 = this.width / 2
        const h1 = this.height - (this.width - w1) - w1
        shape.moveTo(0, 0)
        shape.lineTo(this.width - w1, 0)
        shape.lineTo(this.width - w1, h1)
        shape.absarc(this.width, h1, w1, Math.PI, Math.PI / 2, true)
        shape.lineTo(this.width, this.height)
        shape.absarc(this.width, h1, this.width, Math.PI / 2, Math.PI, false)
        shape.lineTo(0, 0);
        return shape
    }

}

class PolygonPath {
    constructor(points) {
        this.points = points
    }
    getSegments() {
        const segments = []
        for (let i = 0; i < this.points.length; i++) {
            const p1 = this.points[i]
            const p2 = this.points[(i + 1) % this.points.length]
            segments.push(new Line(p1, p2));
        }
        return segments
    }
}

class Polygon {
    constructor(profile, segments, offset, color, category, c1, c2, material) {
        this.material = material;
        this.profile = profile,
        this.shape = profile.getShape();
        this.segments = segments
        this.offset = offset
        this.color = color
        this.category = category
        this.c1 = c1
        this.c2 = c2
    }

    create() {
        const group = new THREE.Group()
        const profiles = [];
        //building each profile segment based on line segments
        this.segments.forEach((segment, i) => {

            let length = segment.length2() - this.offset * 2
            //Normalizing
            const dx = segment.p2.x - segment.p1.x
            const dy = segment.p2.y - segment.p1.y
            const len = Math.sqrt(dx * dx + dy * dy)
            const dir = new THREE.Vector2(dx / len, dy / len)

            //check for bead in horizontal direction
            const horizontal = Math.abs(dir.x) > Math.abs(dir.y)
            if (this.category === "bead" && horizontal) {
                length -= this.profile.height * 2
            }

            //extruding single profile segment
            const mesh = Geometry.extrude(this.shape, length, this.color, this.c1, this.c2, this.material)

            mesh.position.set(segment.p1.x, segment.p1.y, segment.p1.z)

            if (this.category === "bead" && horizontal) {
                mesh.position.x += dir.x * this.profile.height
                mesh.position.y += dir.y * this.profile.height
            }

            const normal = new THREE.Vector2(-dir.y, dir.x)

            mesh.position.x += dir.x * this.offset
            mesh.position.y += dir.y * this.offset

            mesh.position.x += normal.x * this.offset
            mesh.position.y += normal.y * this.offset

            mesh.rotation.z = segment.angle()

            mesh.metaData = {
                category: this.category,
                segmentIndex: i
            }

            mesh.add(Geometry.outline(mesh.geometry))
            selectableMeshes.push(mesh)

            group.add(mesh)
        })

        return group
    }
}

class Geometry {
    static extrude(shape, length, color, c1, c2, material) {
        const path = new THREE.LineCurve3(
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(length, 0, 0)
        )

        const geometry = new THREE.ExtrudeGeometry(shape, {
            steps: 1,
            extrudePath: path
        })

        Geometry.miterCut(geometry, length, c1, c2)
        
        const Material = new THREE.MeshBasicMaterial({ color })
        return new THREE.Mesh(geometry, Material);
    }

    static miterCut(geometry, length, a1, a2) {
        const pos = geometry.attributes.position
        for (let i = 0; i < pos.count; i++) {
            const x = pos.getX(i)
            const y = pos.getY(i)
            if (x > length / 2) pos.setX(i, length - y / Math.tan(a1 * Math.PI / 180))
            if (x < length / 2) pos.setX(i, y / Math.tan(Math.abs(180 - a2) * Math.PI / 180))

        }
        pos.needsUpdate = true
    }

    static outline(geometry) {
        const edges = new THREE.EdgesGeometry(geometry, 15)
        const material = new THREE.LineBasicMaterial({ color: "#000000" })
        const outline = new THREE.LineSegments(edges, material);
        return outline;
    }

}

class RaySystem {

    constructor(camera) {
        this.camera = camera
        this.raycaster = new THREE.Raycaster()
        this.mouse = new THREE.Vector2()
        window.addEventListener("dblclick", (e) => this.click(e))
    }

    click(e) {
        this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1
        this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1

        this.raycaster.setFromCamera(this.mouse, this.camera)

        // recursive true ensures raycast checks children (like outline)
        const hit = this.raycaster.intersectObjects(selectableMeshes, true)

        if (!hit.length) {
            this.resetColors()
            return
        }

        // always get the main mesh, not the child outline
        let selected = hit[0].object
        while (selected && !selectableMeshes.includes(selected)) {
            selected = selected.parent
        }
        if (!selected) return
        this.highlightSelection(selected)

    }
    highlightSelection(mesh) {
        const category = mesh.metaData.category
        selectableMeshes.forEach(obj => {
            const objCategory = obj.metaData.category
            obj.material.color.set(COLORS[objCategory].default)
            // obj.material.map = null;
            // obj.material.needsUpdate = true;

        })
        selectableMeshes.forEach(obj => {

            if (obj.metaData.category === category) {
                obj.material.color.set(COLORS[category].category)
                // obj.material.map = null;
                // obj.material.needsUpdate = true;
            }

        })

        mesh.material.color.set(COLORS[category].segment)
    }

    resetColors() {
        selectableMeshes.forEach(obj => {
            const category = obj.metaData.category
            obj.material.color.set(COLORS[category].default)
            //obj.material.map = woodMaterial;

        })

    }

}



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

    // if(windowW === 0) windowW = 50;
    // if(windowH === 0) windowW = 50;
    // if(frameW === 0) frameW = 6.0;
    // if(frameH === 0) frameH = 6.0;
    // if(frameW1 === 0) frameW1 = 5.0;
    // if(frameH1 === 0) frameH1 = frameH - 3.0
    // if(beadW === 0) beadW = 2.0
    // if(beadH === 0) beadH = 3.0

    createWindow(windowW, windowH, frameW, frameH, frameW1, frameH1, beadW, beadH);
});