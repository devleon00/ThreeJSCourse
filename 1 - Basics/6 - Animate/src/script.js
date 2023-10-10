import * as THREE from "three";
import gsap from "gsap";

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

// Time
// let time = Date.now();

// Clock
// const clock = new THREE.Clock();

// GSAP doind the animation instead of the renderer, we are just updating the renderer
gsap.to(cube.position, { duration: 1, delay: 1, x: 2 });
gsap.to(cube.position, { duration: 1, delay: 2, x: 0 });


// Animation
// RequestAnimationFrame is to call the function in the next frame
const tick = () => {
	// To fix the different ticks per second on different devices
	// If you multiply the animation by the time passed since the last frame, it will be the same on all devices
	// const currentTime = Date.now();
	// const deltaTime = currentTime - time;
	// time = currentTime;

	// Clock, dont use get delta time, use get elapsed time
	// const elapsedTime = clock.getElapsedTime();
	// console.log(elapsedTime);

	// // Update objects
	// // cube.rotation.x = elapsedTime * Math.PI * 2;
	// // cube.rotation.y = elapsedTime * Math.PI * 2;

    // camera.position.y = Math.sin(elapsedTime);
    // camera.position.x = Math.cos(elapsedTime);
    // camera.lookAt(cube.position);
	// Render
	renderer.render(scene, camera);

	window.requestAnimationFrame(tick);
};

tick();
