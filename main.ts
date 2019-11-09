import Camera from "./src/Camera";
import InputHandler from "./src/InputHandler";
import Scene from "./src/Scene";
import Canvas from "./src/Canvas";
import Renderer from "./src/Renderer";
import Vertex from "./src/Vertex";

const canvasElement = <HTMLCanvasElement> document.getElementById('projectionCanvas');
const canvas = new Canvas(canvasElement);
const camera = new Camera();
new InputHandler(camera);
const scene = new Scene();
import Cube from "./src/WorldObjects/Cube";
import {randomColor} from "./src/Services/Color";
import {randomSign} from "./src/Services/Math";

for (let i = 0; i < 15; i++) {
    const color = randomColor();
    const center = new Vertex(randomSign() * Math.random() * 10 * i,   25 + randomSign() * Math.random() * 10 * i,  25 + randomSign() * Math.random() * 5 * (i));
    scene.addElement(new Cube(center,  Math.random() * 6, color));
}

scene.addElement(new Cube(new Vertex(12,12,122),  Math.random() * 6, randomColor()));


const renderer = new Renderer(scene, camera, canvas);
renderer.render();