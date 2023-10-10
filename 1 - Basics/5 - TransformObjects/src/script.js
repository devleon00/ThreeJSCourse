import * as THREE from "three";

// Scene
const scene = new THREE.Scene();

// Red Cube
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const cube = new THREE.Mesh(geometry, material);
// cube.position.x = 0.7;
// cube.position.y = -0.6;
// cube.position.z = 1;
// scene.add(cube);
// It wll move the cube 1 unit in the x axis
// cube.position.normalize();
// // console.log(cube.position.length()); // 1

// // set position with set method (x, y, z)
// cube.position.set(0.7, -0.6, 1);

// Scale
// cube.scale.x = 2;
// cube.scale.y = 0.5;
// cube.scale.z = 0.5;
// cube.scale.set(2, 0.5, 0.5);

// // Rotation (radians) Euler angles that represent the rotation of an object in 3D space the calculation is done in radians (2 * PI = 360 degrees)
// // You can stuck the rotation if you do a lot of rotations
// // The order of the rotations matters
// cube.rotation.reorder("YXZ");
// cube.rotation.x = Math.PI * 0.25;
// cube.rotation.y = Math.PI * 0.25;

// When you update the rotation you update the quaternion, so you can use the quaternion instead of the rotation

// Axes helper (x: red, y: green, z: blue) helps to see the position of the cube
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

// // Sizes
// const sizes = {
// 	width: 800,
// 	height: 600,
// };

// Group of objects
const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
group.add(cube1);

const cube2 = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
cube2.position.x = -2;
group.add(cube2);


const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
cube3.position.x = 2;
group.add(cube3);

group.rotation.y = 1;

// Camera
// Parameters: Field of view, aspect ratio, near clipping plane, far clipping plane (objects further than far clipping plane are not rendered)
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

// camera.lookAt(new THREE.Vector3(3, 0, 0));

// console.log(cube.position.length());
// console.log(cube.position.distanceTo(camera.position));

// Move camera back
camera.position.z = 5;
camera.position.x = 1;
camera.position.y = 1;

// lookAt method this method will make the camera look at the position of the object that you pass as an argument (in this case the cube) in this case the camera will look at the center of the cube
// camera.lookAt(new THREE.Vector3(3, 0, 0));
camera.lookAt(group.position);

// Renderer
// const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// // Render
// renderer.render(scene, camera);

renderer.render(scene, camera);
