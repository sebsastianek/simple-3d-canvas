import {Subject} from "rxjs";
import ProjectionMatrix from "./ProjectionMatrix";
import Vertex from "./Vertex";
import ViewMatrix from "./ViewMatrix";
import {cos, Matrix, matrix, multiply, sin, unit, round} from "mathjs";


export default class Camera {
    private _near: number = 0.1;
    private _far: number = 100;
    private _angleOfView: number = 160;
    private _pitch: number = 0;
    private _yaw: number = 0;
    private readonly _projectionMatrix: ProjectionMatrix;
    private readonly _viewMatrix: ViewMatrix;
    private readonly _position: Vertex;
    private readonly _cameraUpdate: any;
    static STEP =  5;
    static DEGREE_STEP = 0.2;

    constructor() {
        this._cameraUpdate = new Subject();
        this._position = new Vertex(0, 0, -75);
        this._projectionMatrix = new ProjectionMatrix(this);
        this._viewMatrix = new ViewMatrix(this);
    }

    get pitch(): number {
        return this._pitch;
    }

    set pitch(value: number) {
        if (value > 90) {
            value = -90;
        } else if (value < -90) {
            value = 90;
        }
        this._pitch = value;
    }

    get yaw(): number {
        return this._yaw;
    }

    set yaw(value: number) {
        if (value > 360) {
            value = 0;
        } else if (value < 0) {
            value = 360;
        }
        this._yaw = value;
    }

    tickPitch(step: number = Camera.DEGREE_STEP) {
        this.pitch += step;
        this.onCameraChange();
    }

    tickYaw(step: number = Camera.DEGREE_STEP) {
        this.yaw += step;
        this.onCameraChange();
    }

    get near(): number {
        return this._near;
    }

    set near(value: number) {
        this._near = value;
    }

    get far(): number {
        return this._far;
    }

    set far(value: number) {
        this._far = value;
    }

    get angleOfView(): number {
        return this._angleOfView;
    }

    set angleOfView(value: number) {
        this._angleOfView = value;
    }

    get projectionMatrix(): ProjectionMatrix {
        return this._projectionMatrix;
    }

    get cameraUpdate(): any {
        return this._cameraUpdate;
    }

    onCameraChange() {
        this._cameraUpdate.next(this);
    }

    get viewMatrix(): ViewMatrix {
        return this._viewMatrix;
    }

    get position(): Vertex {
        return this._position;
    }

    get viewDirectionMatrix() {
        return matrix(
            [
                sin(unit(this.yaw, 'deg')),
                -sin(unit(this.pitch, 'deg')),
                cos(unit(this.pitch, 'deg')) * cos(unit(this.yaw, 'deg'))
            ]
        )
    }

    move(distance: number) {
        const looksAt = this.viewDirectionMatrix;
        this.position.x += looksAt.get([0]) * distance;
        this.position.y += looksAt.get([1]) * distance;
        this.position.z += looksAt.get([2]) * distance;
        this.onCameraChange();
    }

    moveForward() {
        this.move(Camera.STEP);
    }

    moveBackward() {
        this.move(-Camera.STEP);
    }


    zoomIn() {
        this.angleOfView -= 1;
        this.onCameraChange();
    }

    zoomOut() {
        this.angleOfView += 1;
        this.onCameraChange();
    }

    look(dx: number, dy: number) {
        this.tickYaw(dx / 10 * Camera.DEGREE_STEP);
        this.tickPitch(dy / 10 * Camera.DEGREE_STEP);
    }

    lookLeft() {
        this.tickYaw();
    }

    lookRight() {
        this.tickYaw(-Camera.DEGREE_STEP);
    }

    lookUp() {
        this.tickPitch();
    }

    lookDown() {
        this.tickPitch(-Camera.DEGREE_STEP);
    }
}