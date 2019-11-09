import Camera from "./Camera";

export type KeyboardActions = 37 | 38 | 39 | 40 | 187 | 189;

export default class InputHandler {
    static KEY_UP = 38;
    static KEY_DOWN = 40;
    static KEY_ZOOM_PLUS = 187;
    static KEY_ZOOM_MINUS = 189;
    static KEY_LOOK_UP = 87;
    static KEY_LOOK_DOWN = 83;
    static KEY_LOOK_LEFT = 65;
    static KEY_LOOK_RIGHT = 68;

    private _camera: Camera;
    private _mousePressState: boolean = false;

    constructor(camera: Camera) {
        this.initListener();
        this._camera = camera;
    }

    get mousePressState(): boolean {
        return this._mousePressState;
    }

    set mousePressState(value: boolean) {
        this._mousePressState = value;
    }

    initListener() {
        window.addEventListener('keydown', this.handleKeyPress.bind(this));
        window.addEventListener('mousemove', this.handleMouseMove.bind(this));
        window.addEventListener('mousedown', () => this.mousePressState = true);
        window.addEventListener('mouseup', () => this.mousePressState = false);
    }

    handleMouseMove(event: MouseEvent) {
        if (this.mousePressState) {
            this._camera.look(event.movementX, event.movementY);
        }
    }

    handleKeyPress(event: KeyboardEvent) {
        switch (event.keyCode) {
            case InputHandler.KEY_UP:
                this._camera.moveForward();
                break;
            case    InputHandler.KEY_DOWN:
                this._camera.moveBackward();
                break;
            case   InputHandler.KEY_ZOOM_PLUS:
                this._camera.zoomIn();
                break;
            case    InputHandler.KEY_ZOOM_MINUS:
                this._camera.zoomOut();
                break;
            case InputHandler.KEY_LOOK_UP:
                this._camera.lookUp();
                break;
            case InputHandler.KEY_LOOK_DOWN:
                this._camera.lookDown();
                break;
            case InputHandler.KEY_LOOK_LEFT:
                this._camera.lookLeft();
                break;
            case InputHandler.KEY_LOOK_RIGHT:
                this._camera.lookRight();
                break;
            default:
                console.log('-- Unsupported key triggered with code -- ' + event.keyCode);
        }
    }
}
