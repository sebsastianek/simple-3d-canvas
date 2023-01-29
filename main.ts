import "core-js/es";

import Camera from "./src/Camera";
import InputHandler from "./src/InputHandler";
import Scene from "./src/Scene";
import Canvas from "./src/Canvas";
import Renderer from "./src/Renderer";
import Vertex from "./src/Vertex";
import Cube from "./src/WorldObjects/Cube";
import {randomColor} from "./src/Services/Color";
import {randomSign} from "./src/Services/Math";
import {SceneRandomizerDecorator} from "./src/SceneRandomizerDecorator";
import {SceneInterface} from "./src/Scene.interface";

const canvasElement = <HTMLCanvasElement> document.getElementById('projectionCanvas');
const canvas = new Canvas(canvasElement);
const camera = new Camera();
new InputHandler(camera);
let scene: SceneInterface = new Scene();

// Randomize elements;
scene = new SceneRandomizerDecorator(scene);

for (let i = 0; i < 15; i++) {
    const color = randomColor();
    const center = new Vertex(randomSign() * Math.random() * 10 * i,   25 + randomSign() * Math.random() * 10 * i,  25 + randomSign() * Math.random() * 5 * (i));
    scene.addElement(new Cube(center,  Math.random() * 6, color));
}

const renderer = new Renderer(scene, camera, canvas, window);
