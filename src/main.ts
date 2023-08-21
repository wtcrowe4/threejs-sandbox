import * as THREE from 'three';
import Scene from './Scene';


const scene = new Scene();
scene.Initialize();

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


camera.position.z = 5;

renderer.render(scene, camera);

function animate() {
    scene.Update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();