import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const windowSizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

window.addEventListener("resize", () => {
	// Update sizes
	windowSizes.width = window.innerWidth;
	windowSizes.height = window.innerHeight;

	// Update camera, when we change aspect we need to update the projection matrix
	camera.aspect = windowSizes.width / windowSizes.height;
	camera.updateProjectionMatrix();

	// Update renderer
	renderer.setSize(windowSizes.width, windowSizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Scene
const scene = new THREE.Scene();

// const vertices = [];
// Vertices
// const vertex1 = new THREE.Vector3(0, 0, 0);
// vertices.push(vertex1);

// const vertex2 = new THREE.Vector3(0, 1, 0);
// vertices.push(vertex2);

// const vertex3 = new THREE.Vector3(1, 0, 0);
// vertices.push(vertex3);

// for (let i = 0; i < 50; i++) {
// 	for (let j = 0; j < 3; j++) {
// 		vertices.push(
// 			new THREE.Vector3(
// 				(Math.random() - 0.5) * 4,
// 				(Math.random() - 0.5) * 4,
// 				(Math.random() - 0.5) * 4
// 			)
// 		);
// 	}
// }

// Faces
// const geometry = new THREE.BufferGeometry().setFromPoints(vertices);

// Using BufferGeometry
const geometry = new THREE.BufferGeometry();

let count = 50;
const positionsArray = new Float32Array(count * 3 * 3);

for (let i = 0; i < count * 3 * 3; i++) {
	positionsArray[i] = Math.random() - 0.5;
}

// Here we say that we want to use 3 values per vertex
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);

geometry.setAttribute("position", positionsAttribute);

// Red Cube
// Here this is the number of segments in the geometry (the more segments the more smooth the geometry will be)
// const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
const material = new THREE.MeshBasicMaterial({
	color: 0xff0000,
	wireframe: true,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const camera = new THREE.PerspectiveCamera(
	75,
	windowSizes.width / windowSizes.height,
	0.1,
	1000
);

// Move camera back
camera.position.z = 5;
camera.lookAt(cube.position);
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, windowSizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

let canvas = renderer.domElement;

window.addEventListener("dblclick", () => {
	const fullscreenElement =
		document.fullscreenElement || document.webkitFullscreenElement;

	if (!fullscreenElement) {
		if (canvas.requestFullscreen) {
			canvas.requestFullscreen();
		} else if (canvas.webkitRequestFullscreen) {
			canvas.webkitRequestFullscreen();
		}
	} else {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		}
	}
});

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
// Damping
controls.enableDamping = true;

const tick = () => {
	controls.update();
	renderer.render(scene, camera);

	requestAnimationFrame(tick);
};

tick();
