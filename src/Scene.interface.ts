import {WorldObjectInterface} from "./WorldObjects/WorldObject.interface";


export interface SceneInterface {
    elements: WorldObjectInterface[];
    addElement(element: WorldObjectInterface): void;
    removeElement(element: WorldObjectInterface): void;
}
