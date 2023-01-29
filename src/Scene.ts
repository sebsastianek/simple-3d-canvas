import {WorldObjectInterface} from "./WorldObjects/WorldObject.interface";
import {SceneInterface} from "./Scene.interface";

export default class Scene implements SceneInterface {
    private _elements: WorldObjectInterface[] = [];

    get elements(): WorldObjectInterface[] {
        return this._elements;
    }

    set elements(value: WorldObjectInterface[]) {
        this._elements = value;
    }

    addElement(element: WorldObjectInterface) {
        this.elements.push(element);
    }

    removeElement(element: WorldObjectInterface) {
        this.elements = this.elements.filter((elem) => elem !== element);
    }
}
