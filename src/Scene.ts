import {WorldObjectInterface} from "./WorldObjects/WorldObject.interface";

export default class Scene {
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