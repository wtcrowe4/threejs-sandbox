import * as THREE from 'three';
import Scene from './Scene';
import * as dat from 'dat.gui';



const gui = new dat.GUI();
gui.addFolder('Camera');
gui.addFolder('Lighting');
gui.addFolder('Objects');
gui.addFolder('Scene');

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const scene = new Scene(camera);
scene.Initialize();

renderer.render(scene, camera);

function animate() {
    scene.Update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();