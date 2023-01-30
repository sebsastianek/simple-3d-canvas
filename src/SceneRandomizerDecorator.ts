import {WorldObjectInterface} from "./WorldObjects/WorldObject.interface";
import {randomizeRgbString} from "./Services/Color";
import {randomSign} from "./Services/Math";
import {SceneInterface} from "./Scene.interface";


export class SceneRandomizerDecorator implements SceneInterface {
    private _scene: SceneInterface;
    private _randomMoveStep: number;

    constructor(scene: SceneInterface, randomMoveStep = 0.05) {
        this._scene = scene;
        this._randomMoveStep = randomMoveStep;
    }

    get elements() {
        this.randomize();
        return this._scene.elements;
    }

    set elements(elements: WorldObjectInterface[]) {
        this._scene.elements = elements;
    }

    addElement(element: WorldObjectInterface): void {
        this._scene.addElement(element);
    }

    removeElement(element: WorldObjectInterface): void {
        this._scene.removeElement(element);
    }

    randomize() {
        this._scene.elements = this._scene.elements.map((worldObject: WorldObjectInterface) => {
            worldObject.color = randomizeRgbString(worldObject.color);
            worldObject.center.x = worldObject.center.x + randomSign() * this._randomMoveStep;
            worldObject.center.y = worldObject.center.y + randomSign() * this._randomMoveStep;
            worldObject.center.z = worldObject.center.z + randomSign() * this._randomMoveStep;
            worldObject.createPolygons();
            return worldObject;
        })
    }
}
