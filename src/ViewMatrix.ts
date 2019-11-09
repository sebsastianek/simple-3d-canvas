import Abstract44Matrix from "./Abstract44Matrix";
import Camera from "./Camera";
import {cos, sin, unit, matrix, multiply} from 'mathjs'
import Vertex from "./Vertex";


export default class ViewMatrix extends Abstract44Matrix {
    private _camera: Camera;

    constructor(camera: Camera) {
        super();
        this._camera = camera;
        this.matrix.set([3, 1], -10);
        this.matrix.set([3, 2], -20);
        this.updateMatrix();
        this._camera.cameraUpdate.subscribe((value: Camera) => {
            this.updateMatrix();
        })
    }

    updateMatrix() {
        const cosPitch = cos(unit(this._camera.pitch, 'deg'));
        const sinPitch = sin(unit(this._camera.pitch, 'deg'));
        const cosYaw = cos(unit(this._camera.yaw, 'deg'));
        const sinYaw = sin(unit(this._camera.yaw, 'deg'));
        const xAxis = new Vertex(cosYaw, 0, -sinYaw);
        const yAxis = new Vertex(sinYaw * sinPitch, cosPitch, cosYaw * sinPitch);
        const zAxis = new Vertex(sinYaw * cosPitch, -sinPitch, cosPitch * cosYaw);

        this.matrix = matrix([
                [xAxis.x, yAxis.x, zAxis.x, 0],
                [xAxis.y, yAxis.y, zAxis.y, 0],
                [xAxis.z, yAxis.z, zAxis.z, 0],
                [
                    -multiply(xAxis.toMatrix(), this._camera.position.toMatrix()),
                    -multiply(yAxis.toMatrix(), this._camera.position.toMatrix()),
                    -multiply(zAxis.toMatrix(), this._camera.position.toMatrix()),
                    1
                ]
            ]
        );
    }

}