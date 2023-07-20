import './style.css';
import * as THREE from 'three';

/**
 * TODO: REMOVE BELOW
 */
import {ModelLoader} from "./AssetManagement/ModelLoader.js";
/**
 * TODO: REMOVE ABOVE
 */

/**
 * TODO: REMOVE BELOW
 */
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
/**
 * TODO: REMOVE ABOVE
 */

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene()

// // Object
// const geometry = new THREE.BoxGeometry(1, 1, 1);
//
// // Geometry
// const material = new THREE.MeshBasicMaterial({
//     color: 0xff0000
// });
//
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * TODO: REMOVE BELOW
 */
const modelLoader = new ModelLoader();
modelLoader.load("gol.glb", "00001", function (result)
{
    if(result == null)
    {
        console.error("error loading asset");
    }
    else
    {
        result.scale.set(4.5, 4.5, 4.5);
        console.log(result);
        scene.add(result);
    }
});

/**
 * TODO: REMOVE ABOVE
 */

    // LIGHTS

const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
hemiLight.color.setHSL( 0.6, 1, 0.6 );
hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
hemiLight.position.set( 0, 50, 0 );
scene.add( hemiLight );

const hemiLightHelper = new THREE.HemisphereLightHelper( hemiLight, 10 );
scene.add( hemiLightHelper );

//

const dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
dirLight.color.setHSL( 0.1, 1, 0.95 );
dirLight.position.set( - 1, 1.75, 1 );
dirLight.position.multiplyScalar( 30 );
scene.add( dirLight );

dirLight.castShadow = true;

dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;

const d = 50;

dirLight.shadow.camera.left = - d;
dirLight.shadow.camera.right = d;
dirLight.shadow.camera.top = d;
dirLight.shadow.camera.bottom = - d;

dirLight.shadow.camera.far = 3500;
dirLight.shadow.bias = - 0.0001;

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 3;
scene.add(camera);


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//TOREMOVE
const controls = new OrbitControls(camera, renderer.domElement);
//TOREMOVE

// Animate
const clock = new THREE.Clock();

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime();

    // Update
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
}

tick();