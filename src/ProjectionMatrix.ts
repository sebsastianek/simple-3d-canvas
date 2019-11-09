import {tan, pi} from 'mathjs';
import Camera from "./Camera";
import Abstract44Matrix from "./Abstract44Matrix";

export default class ProjectionMatrix extends Abstract44Matrix {
    private _camera: Camera;

    constructor(camera: Camera) {
        super();
        this._camera = camera;
        this.updateProjectionMatrix();
        camera.cameraUpdate.subscribe(() => {
            this.updateProjectionMatrix();
        });
    }

    updateProjectionMatrix() {
        const scale = 1 / tan(this._camera.angleOfView * 0.5 * pi / 180);
        this.matrix.set([0,0], scale);
        this.matrix.set([1,1], scale);
        this.matrix.set([2,2], -this._camera.far / (this._camera.far - this._camera.near));
        this.matrix.set([2,3], -this._camera.far * this._camera.near / (this._camera.far - this._camera.near));
        this.matrix.set([3,2], -1);
        this.matrix.set([3,3], 0);
    }

}