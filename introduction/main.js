// initalizing the scene

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 30);


// initalizing the renderer

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// adding a cube to the scene
const geometryCube = new THREE.BoxGeometry(1, 1, 1);
const materialCube = new THREE.MeshBasicMaterial({color: "white"});
const cube = new THREE.Mesh(geometryCube, materialCube);
scene.add(cube);

// adding a border to the cube
var geometryCubeWire = new THREE.EdgesGeometry(cube.geometry);
var materialCubeWire = new THREE.LineBasicMaterial({color: "blue", linewidth: 40000});
var wireframe = new THREE.LineSegments(geometryCubeWire, materialCubeWire);
wireframe.renderOrder = 1;
cube.add(wireframe);

// larger cube wireframe
const geometryCube2 = new THREE.BoxGeometry(10, 10, 10);
const materialCube2 = new THREE.MeshBasicMaterial({color: "blue"});
var cube2 = new THREE.LineSegments(geometryCube2, materialCube2);
cube.add(cube2);


// adding a line to the scene
const materialLine = new THREE.LineBasicMaterial({color: "white"}); 
const points = [];
points.push(new THREE.Vector3(-10, 10, 0));
points.push(new THREE.Vector3(10, 10, 0));
points.push(new THREE.Vector3(10, -10, 0));
points.push(new THREE.Vector3(-10, -10, 0));
points.push(new THREE.Vector3(-10, 10, 0));


const geometryLine = new THREE.BufferGeometry().setFromPoints(points);

const line = new THREE.Line(geometryLine, materialLine);
cube.add(line);

// rendering the scene

let changeValue = 0.01;

function animate() {
    camera.lookAt(0, 0, 0);
    cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    cube.position.y = Math.sin(changeValue) * 10;

    changeValue += 0.01;

    // camera.position.z += changeValue;
    // if (camera.position.z > 5 || camera.position.z < 2) {
    //     changeValue *= -1;
    // }
    

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

window.onload = animate();



document.addEventListener("keydown", (event) => {
    event.preventDefault();
    let n = 1;
    switch(event.code) {
        case "ArrowUp":
            camera.position.y += n;
            break;
        case "ArrowDown":
            camera.position.y -= n;
            break;
        case "ArrowLeft":
            camera.position.x -= n;
            break;
        case "ArrowRight":
            camera.position.x += n;
            break;
        case "KeyW":
            camera.position.z -= n;
            break;
        case "KeyS":
            camera.position.z += n;
            break;
    }
});
