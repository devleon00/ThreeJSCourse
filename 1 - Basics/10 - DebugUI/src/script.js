import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import gsap from "gsap";

const gui = new dat.GUI();

const parameters = {
	color: 0xff0000,
	spin: () => {
		gsap.to(cube.rotation, { duration: 1, y: cube.rotation.y + Math.PI * 2 });
	},
};

gui.addColor(parameters, "color").onChange(() => {
	material.color.set(parameters.color);
});
gui.add(parameters, "spin");

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

// Red Cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: parameters.color });
const cube = new THREE.Mesh(geometry, material);
cube.visible = false;
scene.add(cube);

// Debug
// gui.add accepts an object, property name, min, max, step
gui.add(cube.position, "y").min(-3).max(3).step(0.01).name("elevation");
gui.add(cube, "visible");
gui.add(material, "wireframe");

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
