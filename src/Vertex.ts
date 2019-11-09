import {Matrix, matrix} from 'mathjs';

export default class Vertex {
    private _x: number;
    private _y: number;
    private _z: number;

    constructor(x: number, y: number, z: number) {
        this._x = x;
        this._y = y;
        this._z = z;
    }

    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
    }

    get y(): number {
        return this._y;
    }

    set y(value: number) {
        this._y = value;
    }

    get z(): number {
        return this._z;
    }

    set z(value: number) {
        this._z = value;
    }

    toMatrix(): Matrix {
        return matrix(
            [this.x, this.y, this.z, 1]
        );
    }

    distanceTo(vertex: Vertex) {
        return Math.pow(this.x - vertex.x, 2) + Math.pow(this.y - vertex.y, 2) + Math.pow(this.z - vertex.z, 2);
    }

    static fromMatrix(matrix: Matrix): Vertex {
        return new Vertex(
            matrix.get([0]),
            matrix.get([1]),
            matrix.get([2])
        );
    }
}