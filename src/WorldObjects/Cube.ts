import {WorldObjectInterface} from "./WorldObject.interface";
import Polygon from "./Polygon";
import Vertex from "../Vertex";
import {randomColor} from "../Services/Color";


export default class Cube implements WorldObjectInterface {
    polygons: Polygon[];
    private _color: string;

    constructor(center: Vertex, size: number, color: string) {
        this._color = color;
        this.createPolygons(center, size);
    }

    /**
     * @param center
     * @param size
     */
    createPolygons(center: Vertex, size: number) {
        const baseVertices: Vertex[] = [
            new Vertex(center.x - size,center.y - size,center.z - size),
            new Vertex(center.x - size,center.y - size, center.z + size),
            new Vertex(center.x - size, center.y + size, center.z + size),
            new Vertex(center.x + size, center.y + size,center.z - size),
            new Vertex(center.x - size, center.y + size,center.z - size),
            new Vertex(center.x + size,center.y - size, center.z + size),
            new Vertex(center.x + size,center.y - size,center.z - size),
            new Vertex(center.x + size, center.y + size, center.z + size),
        ];

        const connections = [
            [0, 1, 2],		 [3, 0, 4],		 [5, 0, 6],		 [3, 6, 0],
            [0, 2, 4],		 [5, 1, 0], 	 [2, 1, 5],		 [7, 6, 3],
            [6, 7, 5],		 [7, 3, 4],		 [7, 4, 2],		 [7, 2, 5]
        ];

        this.polygons = connections.map((connection) => {
            const polygon = new Polygon(baseVertices[connection[0]], baseVertices[connection[1]], baseVertices[connection[2]]);
            polygon.color = this.color;
            return polygon;
        });
    }

    get color(): string {
        return this._color;
    }

    set color(value: string) {
        this._color = value;
    }

    getPolygons(): Polygon[] {
        return this.polygons;
    }
}