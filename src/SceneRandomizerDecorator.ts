import {WorldObjectInterface} from "./WorldObjects/WorldObject.interface";
import {randomizeRgbString} from "./Services/Color";
import {randomSign} from "./Services/Math";
import {SceneInterface} from "./Scene.interface";


export class SceneRandomizerDecorator implements SceneInterface {
    private _scene: SceneInterface;

    constructor(scene: SceneInterface) {
        this._scene = scene;
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
            worldObject.center.x = worldObject.center.x + randomSign() * 0.2;
            worldObject.center.y = worldObject.center.y + randomSign() * 0.2;
            worldObject.center.z = worldObject.center.z + randomSign() * 0.2;
            worldObject.createPolygons();
            return worldObject;
        })
    }
}
