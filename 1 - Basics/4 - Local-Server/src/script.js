import * as THREE from "three";

// Scene
const scene = new THREE.Scene();

// Red Cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// // Sizes
// const sizes = {
// 	width: 800,
// 	height: 600,
// };

// Camera
// Parameters: Field of view, aspect ratio, near clipping plane, far clipping plane (objects further than far clipping plane are not rendered)
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

// Move camera back
camera.position.z = 5;
// camera.position.x = 1;
// camera.position.y = 1;

// Renderer
// const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// // Render
// renderer.render(scene, camera);
function animate() {
	requestAnimationFrame(animate);

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render(scene, camera);
}

animate();
