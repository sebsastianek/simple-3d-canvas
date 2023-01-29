import Vertex from "../Vertex";

export default class Polygon  {
    private _points: Vertex[];
    private _color: string;

    constructor(first: Vertex, second: Vertex, third: Vertex, color: string = '#000000') {
        this._points = [first, second, third];
        this._color = color;
    }

    get points(): Vertex[] {
        return this._points;
    }

    set points(value: Vertex[]) {
        this._points = value;
    }

    get first(): Vertex {
        return this.points[0];
    }

    get second(): Vertex {
        return this.points[1];
    }

    get third(): Vertex {
        return this.points[2];
    }

    get color(): string {
        return this._color;
    }

    set color(value: string) {
        this._color = value;
    }

    get center(): Vertex {
        return new Vertex(
            (this.first.x + this.second.x + this.third.x) / 3,
            (this.first.y + this.second.y + this.third.y) / 3,
            (this.first.z + this.second.z + this.third.z) / 3
        )
    }
}
