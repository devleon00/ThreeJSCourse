import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

// Debug
const gui = new dat.GUI();

const windowSizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

// Texture
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();

const doorcolorTexture = textureLoader.load("/textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
	"/textures/door/ambientOcclusion.jpg"
);
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
const matcapTexture = textureLoader.load("/textures/matcaps/3.png");
const gradientTexture = textureLoader.load("/textures/gradients/5.jpg");
// gradientTexture.magFilter = THREE.NearestFilter;
// gradientTexture.minFilter = THREE.NearestFilter;

const enviromentMapTexture = cubeTextureLoader.load([
	"/textures/environmentMaps/1/px.jpg",
	"/textures/environmentMaps/1/nx.jpg",
	"/textures/environmentMaps/1/py.jpg",
	"/textures/environmentMaps/1/ny.jpg",
	"/textures/environmentMaps/1/pz.jpg",
	"/textures/environmentMaps/1/nz.jpg",
]);

// Scene
const scene = new THREE.Scene();

scene.background = enviromentMapTexture;

// Objects
// One mesh for 3 different geometries, one material improves performance, this apply plane color
// const material = new THREE.MeshBasicMaterial({
// map: doorcolorTexture
// });
// material.map = doorcolorTexture;
// material.color = 'red' // this gives error because the color is a THREE.Color and in assigning is not creating it
// material.color.set("red"); // This works because set generates it
// material.color = new THREE.Color("red"); // This works because we are creating a new THREE.Color
// material.wireframe = true;
// material.transparent = true;
// material.opacity = 0.5;
// material.alphaMap = doorAlphaTexture;
// To see doble side, but is more calculations for the GPU
// material.side = THREE.DoubleSide;

// Normals are the direction that the face is facing, if we have a light and the normals are not facing the light we will not see the light. Used for lighting calculations and shadows calculations and reflections
// const material = new THREE.MeshNormalMaterial();

// New propertie on this, flat shading, this is not a good practice, we should use smooth shading. This means that the normals won't be interpolated between the vertices
// Use to debug normals
// material.flatShading = true;

// Will display a color using the normal as reference to keep the right color in the right place referencing the normal
// Simulate lights without having it
// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture;

// This color white when you are close and dark when you are far
// const material = new THREE.MeshDepthMaterial();

// This will display the color of the object, but if we have a light it will be affected by the light, this material has performance but looks weird sometimes
// const material = new THREE.MeshLambertMaterial();

// This looks better but is more expensive
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100;
// material.specular = new THREE.Color(0x1188ff);

// Cartoon effect of material
// const material = new THREE.MeshToonMaterial();
// // Here we see a gradient instead of a clear separation toonish effect because the gradient is small and we can use magnification to see it
// gradientTexture.magFilter = THREE.NearestFilter;
// gradientTexture.minFilter = THREE.NearestFilter;
// gradientTexture.generateMipmaps = false; // This will save memory
// material.gradientMap = gradientTexture;

// This is the most expensive material, but is the most realistic one. Also one of the most used. Used PBR (Physically Based Rendering) it supports metalness and roughness
const material = new THREE.MeshStandardMaterial();
material.metalness = 1;
material.roughness = 0;
// Reflect the enviroment map in the material
material.envMap = enviromentMapTexture;

// material.map = doorcolorTexture;
// // To add the shadows to the material , to do this we need to add the uv2 attribute to the geometry
// material.aoMap = doorAmbientOcclusionTexture;
// material.aoMapIntensity = 1; // This is the intensity of the ambient occlusion

// // This looks bad in first instance, because it doesn't have enough information to calculate the normals, it need more vertices, so we invrement in the sphere geometry the number of vertices
// material.displacementMap = doorHeightTexture;
// // Also we need to reduce the intensity
// material.displacementScale = 0.05;
// // Remember to dont combine the value and the map
// // Also we can use the metalness map instead of putting a value
// material.metalnessMap = doorMetalnessTexture;
// // Also we can use the roughness map instead of putting a value
// material.roughnessMap = doorRoughnessTexture;
// // Now we can add the normal map to add more detail to the door
// material.normalMap = doorNormalTexture;
// // Also we can add the normal scale to increase the intensity of the normal map
// material.normalScale.set(0.5, 0.5);
// // Also we can add the alpha map to add transparency to the door, if you plat with the map you also have to active transparent
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;

gui.add(material, "metalness").min(0).max(1).step(0.0001);
gui.add(material, "roughness").min(0).max(1).step(0.0001);
gui.add(material, "aoMapIntensity").min(0).max(100).step(0.0001);
gui.add(material, "displacementScale").min(0).max(1).step(0.0001);

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material);

sphere.position.x = -1.5;

sphere.geometry.setAttribute(
	"uv2",
	new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
);

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material);
// For UV mapping for ambient occlusion
plane.geometry.setAttribute(
	"uv2",
	new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
);

const torus = new THREE.Mesh(
	new THREE.TorusGeometry(0.3, 0.2, 16, 32),
	material
);

torus.geometry.setAttribute(
	"uv2",
	new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
);

torus.position.x = 1.5;

scene.add(plane, sphere, torus);

// Lights
const ambientLigth = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLigth);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

const camera = new THREE.PerspectiveCamera(
	75,
	windowSizes.width / windowSizes.height,
	0.1,
	1000
);

// Move camera back
camera.position.z = 5;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, windowSizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

let canvas = renderer.domElement;

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
// Damping
controls.enableDamping = true;

// Clock
const clock = new THREE.Clock();

const tick = () => {
	const elapsedTime = clock.getElapsedTime();
	// Update objects
	sphere.rotation.y = elapsedTime * 0.1;
	plane.rotation.y = elapsedTime * 0.1;
	torus.rotation.y = elapsedTime * 0.1;

	sphere.rotation.x = elapsedTime * 0.15;
	plane.rotation.x = elapsedTime * 0.15;
	torus.rotation.x = elapsedTime * 0.15;

	controls.update();

	renderer.render(scene, camera);

	requestAnimationFrame(tick);
};

tick();
