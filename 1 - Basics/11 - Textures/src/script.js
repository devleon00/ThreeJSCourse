import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Textures
// We have to use a image as a texture

// Behind the scenes, three.js will create a canvas and draw the image on it
// const image = new Image();
// const texture = new THREE.Texture(image);

// image.onload = () => {
// 	texture.needsUpdate = true;
// };

// image.src = "/textures/door/color.jpg";
const loadingManager = new THREE.LoadingManager();

// loadingManager.onStart = () => {
// 	console.log("onStart");
// }

// loadingManager.onLoad = () => {
// 	console.log("onLoad");
// }

// loadingManager.onProgress = () => {
// 	console.log("onProgress");
// }

// loadingManager.onError = () => {
// 	console.log("onError");
// }

// One texture laoder can load multiple textures
const textureLoader = new THREE.TextureLoader(loadingManager);
// Paramaters: URL, onLoad, onProgress, onError
// const colorTexture = textureLoader.load("/textures/door/color.jpg");
// const colorTexture = textureLoader.load("/textures/checkerboard-8x8.png");
const colorTexture = textureLoader.load("/textures/minecraft.png");
const alphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const heightTexture = textureLoader.load("/textures/door/height.jpg");
const normalTexture = textureLoader.load("/textures/door/normal.jpg");
const ambientOcclusionTexture = textureLoader.load(
	"/textures/door/ambientOcclusion.jpg"
);
const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const roughnessTexture = textureLoader.load("/textures/door/roughness.jpg");

// By default the last pixel get streched and not repeated
// colorTexture.repeat.x = 2;
// colorTexture.repeat.y = 3;
// RepeatWrapping, the S is the X axis and the T is the Y axis
// colorTexture.wrapS = THREE.RepeatWrapping;
// colorTexture.wrapT = THREE.RepeatWrapping;

// colorTexture.offset.x = 0.5;
// colorTexture.offset.y = 0.5;

// // The rotation is in the UV coradinates 0 - 0
// colorTexture.rotation = Math.PI / 4;

// // The center of the rotation
// colorTexture.center.x = 0.5;
// colorTexture.center.y = 0.5;

// This improves the quality the efficiency, we disable it when we use min/max filters 
colorTexture.generateMipmaps = false;
// colorTexture.minFilter = THREE.NearestFilter;
colorTexture.magFilter = THREE.NearestFilter;

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
const material = new THREE.MeshBasicMaterial({ map: colorTexture });
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
