import {Matrix, matrix} from "mathjs";


export default abstract class Abstract44Matrix {
    private _matrix: Matrix;

    protected constructor() {
        this.initMatrix();
    }

    initMatrix() {
        this._matrix = matrix(
            [
                [1,0,0,0],
                [0,1,0,0],
                [0,0,1,0],
                [0,0,0,1]
            ],
        )
    }

    get matrix(): Matrix {
        return this._matrix;
    }

    set matrix(value: Matrix) {
        this._matrix = value;
    }

    tickMatrix(position: number[], step: number = 1) {
        this.matrix.set(position, this.matrix.get(position) + step);
    }

    set(position: number[], value: number) {
        this.matrix.set(position, value);
    }

    get(position: number[]): number {
        return this.matrix.get(position);
    }
}