import Polygon from "./Polygon";
import Vertex from "../Vertex";
import {WorldObjectInterface} from "./WorldObject.interface";


export default class Sphere implements WorldObjectInterface {
    polygons: Polygon[];
    private _color: string;
    private _center: Vertex;
    private _radius: number;
    private _longitudeSegments: number;
    private _latitudeSegments: number;

    constructor(center: Vertex, radius: number, color: string, longitudeSegments = 16, latitudeSegments = 16) {
        this._color = color;
        this._center = center;
        this._radius = radius;
        this._latitudeSegments = latitudeSegments;
        this._longitudeSegments = longitudeSegments;
        this.createPolygons();
    }

    createPolygons() {
        const vertices: Vertex[] = [];

        for (let j = 0; j <= this.latitudeSegments; j++) {
            const theta = j * Math.PI / this.latitudeSegments;
            const sinTheta = Math.sin(theta);
            const cosTheta = Math.cos(theta);

            for (let i = 0; i <= this.longitudeSegments; i++) {
                const phi = i * 2 * Math.PI / this.longitudeSegments;
                const sinPhi = Math.sin(phi);
                const cosPhi = Math.cos(phi);

                const x = this.center.x + this.radius * cosPhi * sinTheta;
                const y = this.center.y + this.radius * cosTheta;
                const z = this.center.z + this.radius * sinPhi * sinTheta;

                vertices.push(new Vertex(x, y, z));
            }
        }

        const connections = [];
        for (let j = 0; j < this.latitudeSegments; j++) {
            for (let i = 0; i < this.longitudeSegments; i++) {
                const a = i + j * (this.longitudeSegments + 1);
                const b = i + (j + 1) * (this.longitudeSegments + 1);
                const c = (i + 1) + (j + 1) * (this.longitudeSegments + 1);
                const d = (i + 1) + j * (this.longitudeSegments + 1);
                connections.push([a, b, c]);
                connections.push([a, c, d]);
            }
        }

        this.polygons = connections.map((connection) => {
            const polygon = new Polygon(vertices[connection[0]], vertices[connection[1]], vertices[connection[2]]);
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

    get radius(): number {
        return this._radius;
    }

    set radius(value: number) {
        this._radius = value;
    }

    get color(): string {
        return this._color;
    }

    set color(value: string) {
        this._color = value;
    }


    get longitudeSegments(): number {
        return this._longitudeSegments;
    }

    set longitudeSegments(value: number) {
        this._longitudeSegments = value;
    }

    get latitudeSegments(): number {
        return this._latitudeSegments;
    }

    set latitudeSegments(value: number) {
        this._latitudeSegments = value;
    }

    getPolygons(): Polygon[] {
        return this.polygons;
    }
}
