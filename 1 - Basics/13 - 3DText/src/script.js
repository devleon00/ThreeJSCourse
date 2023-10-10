import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
// import * as dat from 'lil-gui'
// import typeFace from 'three/examples/fonts/helvetiker_regular.typeface.json' // Importing the font

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Texture
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("/textures/matcaps/8.png");

// Load the font, is an add on should be imported
const fontLoader = new FontLoader();
// For the font loader we have to do a callback
console.log("Hola");
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
	const textGeometry = new TextGeometry("DevLeon", {
		font: font,
		size: 0.5,
		height: 0.2,
		// If we decrement the segments the text will improve in performance
		curveSegments: 5,
		bevelEnabled: true,
		bevelThickness: 0.03,
		bevelSize: 0.02,
		bevelOffset: 0,
		bevelSegments: 4,
	});
	// Center the text
	// Using bounding, bounding says the space taken by the object, that is use for grustum culling that is the process of removing objects that are not in the camera view
	textGeometry.computeBoundingBox();
	console.log(textGeometry.boundingBox);

	// Center the text, we move the object to center the mesh in the scene
	// Because the bevel is not centered we have to move the text to the center of the scene
	// textGeometry.translate(
	// 	-(textGeometry.boundingBox.max.x - 0.02) * 0.5,
	// 	-(textGeometry.boundingBox.max.y - 0.02) * 0.5,
	// 	-(textGeometry.boundingBox.max.z - 0.03) * 0.5
	// );

	// We have to move the text to the center of the scene
	textGeometry.center();

	const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
	const text = new THREE.Mesh(textGeometry, material);
	scene.add(text);

	console.time("donuts");

	// Improve performance put it outsite
	const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);

	const donutMaterial = new THREE.MeshMatcapMaterial({
		matcap: matcapTexture,
	});

	// Add 100 donuts
	for (let i = 0; i < 100; i++) {
		// const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);

		// const donutMaterial = new THREE.MeshMatcapMaterial({
		// 	matcap: matcapTexture,
		// });

		const donut = new THREE.Mesh(donutGeometry, material);

		donut.position.x = (Math.random() - 0.5) * 10;
		donut.position.y = (Math.random() - 0.5) * 10;
		donut.position.z = (Math.random() - 0.5) * 10;

		donut.rotation.x = Math.random() * Math.PI;
		donut.rotation.y = Math.random() * Math.PI;

		const scale = Math.random();
		donut.scale.set(scale, scale, scale);

		scene.add(donut);
	}

	console.timeEnd("donuts");
});

/**
 * Sizes
 */
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

window.addEventListener("resize", () => {
	// Update sizes
	sizes.width = sizes.width;
	sizes.height = sizes.height;

	// Update camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Update renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
	75,
	sizes.width / sizes.height,
	0.1,
	100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
	const elapsedTime = clock.getElapsedTime();

	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
