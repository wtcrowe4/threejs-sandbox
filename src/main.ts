import * as THREE from 'three';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const box_geometry = new THREE.BoxGeometry(3);
const sphere_geometry = new THREE.SphereGeometry(1, 22);
const cone_geometry = new THREE.ConeGeometry(1, 5, 32);
const lime_material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const red_material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const blue_material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const cube = new THREE.Mesh(box_geometry, lime_material);
const sphere = new THREE.Mesh(sphere_geometry, red_material);
const cone = new THREE.Mesh(cone_geometry, blue_material);



scene.add(sphere);
scene.add(cone);
scene.add(cube);

camera.position.z = 5;

renderer.render(scene, camera);

function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    cone.rotation.x += 0.01;
    cone.rotation.y += 0.01;
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();