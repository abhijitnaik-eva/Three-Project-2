import * as THREE from 'three';
import { getShadowMaterial } from 'three/tsl';
export function Experiment()
{

   
    const h = 5;
    const w = 5;
    const t = 15;
    const c1 = 45;
    const c2 = 135;
    const r = 2.5;


    const shape = new THREE.Shape();
    //shape.absarc(0, 0, r, 0, Math.PI * 2, false);
    shape.moveTo(0, 0);
    shape.lineTo(w, 0);
    shape.lineTo(w, h);
    shape.lineTo(0, h);
    shape.lineTo(0, 0);

      // Outer square (start bottom-left)
    // shape.moveTo(0, 0);      // 0
    // shape.lineTo(w, 0);      // 1
    // shape.lineTo(w, h);      // 2
    // shape.lineTo(0, h);      // 3
    // shape.closePath();

    // const midY = h / 2;
    // const midX = w / 2;

    // shape.lineTo(midX, midY); // top-left triangle
    // shape.lineTo(w, midY);    // top-right triangle
    // shape.lineTo(midX, midY); // bottom-left triangle
    // shape.lineTo(0, midY);    // bottom-right triangle

    const material = new THREE.MeshStandardMaterial({color: '#695be1', wireframe: true});
      const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: t,
        bevelEnabled: false
    });

   

    const attr = geometry.attributes.position;
    const vertex = new THREE.Vector3();
    // for( let i = 0; i<attr.count; i++){
    //     vertex.fromBufferAttribute(attr, i);
    //     if(vertex.z > t/2) attr.setZ(i,t-vertex.y/Math.tan(c1 * Math.PI/180))
    //     if(vertex.z < t/2) attr.setZ(i,vertex.y/Math.tan(c1 * Math.PI/180))
    // }
    // attr.needsUpdate = true;

    // let w1 = h/Math.tan(c1 * Math.PI/180);
    // let w2 = h/Math.tan((180-c2) * Math.PI/180);
    // for( let i = 0; i<attr.count; i++){
    //     vertex.fromBufferAttribute(attr, i);
    //     if(vertex.y === h) {
    //         if(vertex.z < t/2) attr.setZ(i,w1);
    //         if(vertex.z > t/2) attr.setZ(i,t-w2);
    //     }
    // }
    // attr.needsUpdate = true;

    const mesh = new THREE.Mesh(geometry, material);
    // mesh.rotation.y = Math.PI/2;
    // mesh.position.z += w;
    return mesh;
}



