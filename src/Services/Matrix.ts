import Vertex from "../Vertex";
import {Matrix, multiply} from "mathjs";

const normalizeMatrix = (matrix: Matrix): Matrix => {
    const w = matrix.get([3]);
    if (w !== 1) {
        matrix.set([0], matrix.get([0]) / w);
        matrix.set([1], matrix.get([1]) / w);
        matrix.set([2], matrix.get([2]) / w)
    }
    return matrix;
};

const multiplyVertexByMatrix = (vertex: Vertex, matrix: Matrix): Vertex => {
    let result = <Matrix> multiply(vertex.toMatrix(), matrix);
    result = normalizeMatrix(result);
    return Vertex.fromMatrix(result);

};

export {
    multiplyVertexByMatrix
}