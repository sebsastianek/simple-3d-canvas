import {WorldObjectInterface} from "./WorldObject.interface";
import Polygon from "./Polygon";
import Vertex from "../Vertex";
import {randomColor} from "../Services/Color";


export default class Cube implements WorldObjectInterface {
    polygons: Polygon[];
    private _color: string;
    private _center: Vertex;
    private _size: number;

    constructor(center: Vertex, size: number, color: string) {
        this._color = color;
        this._center = center;
        this._size = size;
        this.createPolygons();
    }

    createPolygons() {
        const baseVertices: Vertex[] = [
            new Vertex(this.center.x - this.size,this.center.y - this.size,this.center.z - this.size),
            new Vertex(this.center.x - this.size,this.center.y - this.size, this.center.z + this.size),
            new Vertex(this.center.x - this.size, this.center.y + this.size, this.center.z + this.size),
            new Vertex(this.center.x + this.size, this.center.y + this.size,this.center.z - this.size),
            new Vertex(this.center.x - this.size, this.center.y + this.size,this.center.z - this.size),
            new Vertex(this.center.x + this.size,this.center.y - this.size, this.center.z + this.size),
            new Vertex(this.center.x + this.size,this.center.y - this.size,this.center.z - this.size),
            new Vertex(this.center.x + this.size, this.center.y + this.size, this.center.z + this.size),
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

    get center(): Vertex {
        return this._center;
    }

    set center(value: Vertex) {
        this._center = value;
    }

    get size(): number {
        return this._size;
    }

    set size(value: number) {
        this._size = value;
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
