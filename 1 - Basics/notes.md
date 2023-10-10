### Introduction

### What is WebGL and why using three.js?

ThreeJs is a library that makes WebGL easier to use. WebGL is a JavaScript API for rendering interactive 2D and 3D graphics within any compatible web browser without the use of plug-ins. WebGL is integrated completely into all the web standards of the browser allowing GPU accelerated usage of physics and image processing and effects as part of the web page canvas. WebGL elements can be mixed with other HTML elements and composited with other parts of the page or page background. But you can make it work with SVG, CSS, HTML, Canvas, etc.

https://oculus.com/metal-of-honor/
https://letsplay.ouigo.com/
https://live.vanmoof.com/
https://zen.ly
midwam.com
heraclosgame.com
https://chartogne-taillet.com/en

What is WebGL?

JavaScript API
Renders triangles ar remarkable speed
Resutls are displayed in a canvas element or in something else
Compatible with all browsers
Uses the GPU

The GPU drwas triangles, lines and points. First it draws the points, then the lines and finally the triangles. The GPU is very good at drawing triangles. It can draw millions of triangles per second. The GPU is also very good at doing calculations on the vertices of the triangles. It can do millions of calculations per second. The GPU is not very good at doing calculations on the pixels inside the triangles.

Native WebGL to write a single triangle will involve a lot of code. Three.js is a library that makes WebGL easier to use. It is a layer on top of WebGL. It is written in JavaScript and uses the canvas element. It is open source and free to use. It is well documented and has many examples. It is easy to use and has a lot of features. It is very popular and has a large community.

### Basic scene three.js

4 eleeemnts to create a scene:

- Scene that will contain all your 3D objects
  - Like a contaner, with objects, models, lights that have to be rendered
- Some objects
  - Geometries, imported models, particles, lights, cameras, etc.
- Camara
  - Not visible, serve as a point of view, can have multiple cameras of different types
- Renderer
  - Render the scene from the point of view of the camera, result drwan on a canvas element, will use WebGL to draw the scene, you can create the canvar or you can use the one provided by three.js

Mesh is an object that takes a geometry, and applies a material to it, which we then can insert to our scene, and move freely around.

### Local Server vite

Webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset.

The script tag to import doesnt include all the classes, we need to run a server to emulate a website to allow js to access the files

A blunder is a tool that lets you write modular code and bundle it together into small packages to optimize load time.

Vite is a new build tool that aims to provide a faster and leaner development experience for modern web projects. It consists of two major parts: - A dev server that serves your source files over native ES modules, with rich built-in features and astonishingly fast Hot Module Replacement (HMR). - A build command that bundles your code with Rollup, pre-configured to output highly optimized static assets for production.

https://github.com/RodrigoRVSN/threejs-journey/tree/main

NPM is a package manager for the JavaScript programming language. It is the default package manager for the JavaScript runtime environment Node.js. It consists of a command line client, also called npm, and an online database of public and paid-for private packages, called the npm registry.

npm install
npm run dev

### Transfom objects

Properties to transform objects:

- position - Vector3 - x, y, z
- rotation - Euler - x, y, z
- scale - Vector3 - x, y, z
- quaternion - Quaternion - x, y, z, w (not used often) is a way to represent rotation in 3D space without having to deal with Euler angles, which can be ambiguous and prone to gimbal lock.

All objects inherits form Object3D, so they all have these properties. Like PerspectiveCamera, AmbientLight, etc. Those properties will be compiled in matrices and sent to the GPU.

Scene graph is a tree data structure that arranges the logical and often spatial representation of a graphical scene. Scene graphs are most commonly associated with rendering because a scene graph structure allows a renderer to more easily perform spatial culling and ordering.

### Animation

Move the object, then render the scene, move the object again, then render the scene again, etc.
Your animation should look the same regardless of the framerate. If you have a 60fps animation, it should look the same at 30fps, 15fps, etc. The animation should be independent of the framerate.

We can use new Date().now to get the current time in milliseconds. We can use this to calculate the time elapsed between two frames. We can use this to update the animations.

Clock is a simple class to measure time. It has a method called getDelta() that returns the time elapsed between two frames. It is used to update the animations. But because the weird behavior we can use elapsedTime instead.

Gsap is a JavaScript library for building high-performance animations that work in every major browser. Animate CSS, SVG, canvas, React, Vue, WebGL, colors, strings, motion paths, generic objects...animate anything! Official documentation: https://greensock.com/docs/v3

### Camera

- Camara() is an abstract class, other camaras inherit from it
- ArrayCamara render the scen from multiple camaras on specific areas of the render. A use could be a game with multiple cameras
- StereoCamara render the scene for VR, two camaras that mimic the eyes
- CubeCamara render the scene from the inside of a cube, used for reflections. 6 renders, can render the enviroment map, reflection, shadows, etc.
- OrthographicCamara render the scene without perspective, like a 2D game
- PerspectiveCamara render the scene with perspective, like a 3D game

To move the camera with the cursor we can use the mousemove event. We can use the event.clientX and event.clientY properties to get the mouse position. We can use the window.innerWidth and window.innerHeight properties to get the size of the window. We can use the Math.PI property to get the value of PI. And then use cos and sin to calculate the position of the camera. We can use the lookAt() method to make the camera look at a specific position.

We also have controls in thee.js

- DeviceOrientationControls - You can use this class to create a camera that follows the orientation of a device. It is used for VR.
- FlyControls - You can use this class to create a camera that moves like a plane. It is used for games.
- FirstPersonControls - You can use this class to create a camera that moves like a first person shooter. It is used for games.
- PointerLockControls - You can use this class to create a camera that moves like a first person shooter. It is used for games. It is similar to FirstPersonControls but it uses the Pointer Lock API.
- OrbitControls - You can use this class to create a camera that orbits around a target. It is used for 3D editors.
- TrackballControls - You can use this class to create a camera that orbits around a target. It is used for 3D editors. But it is more advanced than OrbitControls. It allows you to zoom and pan the camera.
- TransformControls - You can use this class to create a camera that can be moved, rotated and scaled. It is used for 3D editors.
- DragControls - You can use this class to create a camera that can be moved. It is used for 3D editors. It is similar to TransformControls but it is simpler.

Damping is a technique used to smooth out sudden changes in a value. It is used to make the movement of the camera smoother. We can use the lerp() method to interpolate between two values. We can use the clamp() method to limit a value between two values.

Uso created controls if they have all the features you need, oterwise you can create your own controls.

### FullScreen and resizing

We can use the fullscreen API to make the canvas fullscreen. We can use the resize event to resize the renderer when the window is resized. We can use the window.devicePixelRatio property to get the pixel ratio of the device. We can use the window.innerWidth and window.innerHeight properties to get the size of the window. We can use the renderer.setPixelRatio() method to set the pixel ratio of the renderer. We can use the renderer.setSize() method to set the size of the renderer. And camera.updateProjectionMatrix() method to update the projection matrix of the camera.

Pixel ratio is the ratio between physical pixels and logical pixels. It is used to render the scene at the correct size on high resolution devices. It is usually 1 on low resolution devices and more than 1 on high resolution devices. 2 on retina displays, 3 on retina HD displays, etc. 2 is 4 times more pixels than 1. 3 is 9 times more pixels than 1.

To get fullscreen we requestFullScreen in canvas

### Geometries

Geometries are the shapes of the objects. They are made of vertices and faces. Vertices are points in 3D space. Faces are triangles that connect the vertices.
Can be used to create a mesh, or a line, or a points cloud, particles, etc.
Can store more data than the positions (UVs, normals, colors, etc.)

All geometries inherit from Geometry that has many built methods

- BoxGeometry - You can use this class to create a box. It is used for cubes, walls, floors, etc.
- PlaneGeometry - You can use this class to create a plane. It is used for floors, walls, etc.
- CircleGeometry - You can use this class to create a circle. It is used for buttons, coins, etc.
- ConeGeometry - You can use this class to create a cone. It is used for trees, mountains, etc.
- CylinderGeometry - You can use this class to create a cylinder. It is used for trees, mountains, etc.
- RingGeometry - You can use this class to create a ring. It is used for coins, etc.
- TorusGeometry - You can use this class to create a torus. It is used for donuts, etc.
- TorusknontGeometry - You can use this class to create a torus knot. It is used for knots, etc.
- DodecahedronGeometry - You can use this class to create a dodecahedron. It is used for dice, etc.
- OctahedronGeometry - You can use this class to create a octahedron. It is used for dice, etc.
- TetrahedronGeometry - You can use this class to create a tetrahedron. It is used for dice, etc.
- IcosahedronGeometry - You can use this class to create a icosahedron. It is used for dice, etc.
- SphereGeometry - You can use this class to create a sphere. It is used for balls, planets, etc.
- ShapeGeometry - You can use this class to create a shape. It is used for buttons, coins, etc.
- TubeGeometry - You can use this class to create a tube. It is used for pipes, etc.
- ExtrudeGeometry - You can use this class to create a shape. It is used for buttons, coins, etc.
- LatheGeometry - You can use this class to create a shape. It is used for buttons, coins, etc.
- TextGeometry - You can use this class to create a text. It is used for buttons, coins, etc.

Wireframe true makes the geometry visible, the segments mean the number of lines that will be drawn to make the geometry visible, if more segments are added the geometry will be more visible but it will be more expensive to render.

Buffer Geometries are more efficient and optimized than Geometries. They are used by default in three.js. They are more difficult to use than Geometries. They are more difficult to create and update.

Float32Array is an array of 32-bit floating point numbers. It is used to store the positions of the vertices. Easier to handle for the GPU

When creating a bufferGEometry we can specify a vunch of vertices and then the indices of the vertices that will form the triangles. This is more efficient because we can reuse vertices. We can also specify the normals, UVs, colors, etc.

### Debug UI

dat.gui is a lightweight controller library for JavaScript. It allows you to easily manipulate variables and fire functions on the fly. It is used by three.js to create the debug UI. It is not part of three.js. It is a separate library. It is open source and free to use. It is well documented and has many examples. It is easy to use and has a lot of features. It is very popular and has a large community.

First we add the dat.gui

```bash
npm install dat.gui
```

Then we can add to the panel the properties we want to change
Range, color, text, checkbox, select, button, folder

To add properties to the panel we can use the add() method. We can use the listen() method to listen for changes. We can use the onChange() method to listen for changes. We can use the onFinishChange() method to listen for changes. We can use the remove() method to remove a property from the panel. We can use the destroy() method to destroy the panel.

### Textures

Textures are images that are used to add details to 3D objects. They are applied to materials. They are stored in the GPU memory. They are used to add details to 3D objects. They are used to add colors, patterns, etc. They are used to add roughness, metalness, etc. They are used to add normal maps, bump maps, etc. They are used to add transparency, opacity, etc. They are used to add emissive colors, emissive maps, etc. They are used to add ambient occlusion, light maps, etc. They are used to add displacement maps, etc.

In textures we have:
- Alpha maps - You can use this map to make parts of the material transparent. It is used for leaves, hair, etc.
- Ambient occlusion maps - You can use this map to make parts of the material darker. It is used for creases, holes, etc.
- Color maps - You can use this map to add colors to the material. It is used for skin, wood, etc.
- Height maps - You can use this map to add height to the material. It is used for bricks, walls, etc.
- Metalness maps - You can use this map to make parts of the material metallic. It is used for metal, etc.
- Normal maps - You can use this map to add details to the material. It is used for bumps, scratches, etc.
- roughness maps - You can use this map to make parts of the material rough. It is used for rough surfaces, etc.

PBR Principles 
- Physically based renderering
- Many technices thta tend to follow real life
- Becoming the standard for realistic renders
- Many softwares and engines use PBR

UV unwrapping is like unwrapping an origami and make it flat. It is the process of creating a 2D image from a 3D model. 

- UVs are coordinates that are used to map a texture to a 3D model 
- They are created by three.js but if you create your own 3D model you have to specify them and to do the UV unwrapping

Mipmapping is a technic that creates smaller versions until we get 1 by 1 pixel. It is used to optimize the rendering of textures. It is used to make textures look better when they are far away. It is used to make textures look better when they are at an angle. 

Huge difference when you have small or big images

Minification is the process of making something smaller. Magnification is the process of making something bigger.

colorTexture.magFilter = THREE.NearestFilter;

When preparing your tectures, keep in mind 3 crucial elements:
  - Weight - .jpg lossy, .png lossless, you can use TinyPNG
  - Size - Regardless the weight, the number of pixels will be store, try to have small images, because we use midmapping, and its dividing by two, we need height and weight of powe of 2, 512X512, you can have the jpg and jpg alpha or png for transparency, the normal has to be png
  - Data - sometimes we can conbine different data into one exture by using, red green and blue and aplha in different channels, we can use the alpha channel to store the roughness, metalness, etc. We can use the red channel to store the ambient occlusion, etc. We can use the green channel to store the emissive color, etc. We can use the blue channel to store the displacement, etc. It improves performancy and reduces the number of requests. But it is more difficult to create and update.

  Where to find textures
  - poligon
  - 3dtectures
  - arroway-texture.ch

  photoshop and substance designes for procedural textures

  ### Materials

  Materials are used to put coolor on each visible pixel of the geometries, the algorithms are written in programmas called shaders 

  To have matcaps in https://github.com/nidorx/matcaps

  meshPhiscalMaterial is same as MeshStandardMaterial but with a clear coat effect, this means like a varnish, it will make the material more shiny, but it takes more performance

  Enviroment Map is an image that surronds the image, it will be reflected on the material, it will be used to calculate the reflections, it will be used to calculate the lighting, it will be used to calculate the shadows, etc.

  Website for HDRI https://hdrihaven.com/

  You can use to convert HDRIS to cube maps the toll online
  https://matheowis.github.io/HDRI-to-CubeMap/

  ### Live

  First we need to run npm run build to create the dist folder, then we can run npm run serve to run the server

  But we are going to use vercel to deploy the website, is a continuos deployment, so when we push to github it will deploy automatically. Is developer friendly and easy to use. Alternatives are Netlify and Github Pages
