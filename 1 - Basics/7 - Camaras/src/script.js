import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Cursor
const cursor = {
	x: 0,
	y: 0,
};

window.addEventListener("mousemove", (event) => {
	cursor.x = event.clientX / window.innerWidth - 0.5;
	cursor.y = -(event.clientY / window.innerHeight - 0.5);
	console.log(cursor.x, cursor.y);
});

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
// Parameters: Field of view vertically, aspect ratio, near clipping plane, far clipping plane (objects further than far clipping plane are not rendered)
// Z fighting is when two objects are in the same position, so the renderer doesnt know which one to render, dont use extreme values
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

// Orthographic camera
// Parameters: left, right, top, bottom, near clipping plane, far clipping plane
// const aspectRatio = window.innerWidth / window.innerHeight;
// const camera = new THREE.OrthographicCamera(
// 	-1 * aspectRatio,
// 	1 * aspectRatio,
// 	1,
// 	-1,
// 	0.1,
// 	100
// );

// Move camera back
camera.position.z = 5;
camera.lookAt(cube.position);
scene.add(camera);
// camera.position.x = 1;



// Renderer
// const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
// Damping
controls.enableDamping = true;
// controls.target.y = 2;
// controls.update();

// // Render
// renderer.render(scene, camera);

// Time
// let time = Date.now();

// Clock
const clock = new THREE.Clock();

// GSAP doind the animation instead of the renderer, we are just updating the renderer
// gsap.to(cube.position, { duration: 1, delay: 1, x: 2 });
// gsap.to(cube.position, { duration: 1, delay: 2, x: 0 });

// Animation
// RequestAnimationFrame is to call the function in the next frame
const tick = () => {
	// To fix the different ticks per second on different devices
	// If you multiply the animation by the time passed since the last frame, it will be the same on all devices
	// const currentTime = Date.now();
	// const deltaTime = currentTime - time;
	// time = currentTime;

	// Clock, dont use get delta time, use get elapsed time
	const elapsedTime = clock.getElapsedTime();
	// console.log(elapsedTime);

	// // Update objects
	// cube.rotation.y = elapsedTime;

	// Update camera
	// camera.position.x = Math.sin(cursor.x * Math.PI * 5) * 3;
	// camera.position.z = Math.cos(cursor.x * Math.PI * 5) * 3;
	// camera.position.y = cursor.y * 5;
	// camera.lookAt(cube.position);

	// camera.position.y = Math.sin(elapsedTime);
	// camera.position.x = Math.cos(elapsedTime);
	// camera.lookAt(cube.position);
	// Render
	controls.update();
	renderer.render(scene, camera);

	window.requestAnimationFrame(tick);
};

tick();
