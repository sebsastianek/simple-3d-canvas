import Scene from "./Scene";
import Camera from "./Camera";
import Canvas from "./Canvas";
import Polygon from "./WorldObjects/Polygon";
import {multiplyVertexByMatrix} from "./Services/Matrix";
import Vertex from "./Vertex";
import {isFacedBackwards} from "./Services/BackfaceCulling";
import {SceneRandomizerDecorator} from "./SceneRandomizerDecorator";
import {SceneInterface} from "./Scene.interface";


export default class Renderer {
    private readonly _scene: SceneInterface;
    private readonly _camera: Camera;
    private readonly _canvas: Canvas;
    private readonly _window: Window;

    constructor(scene: SceneInterface, camera: Camera,  canvas: Canvas, window: Window) {
        this._scene = scene;
        this._camera = camera;
        this._window = window;
        this._canvas = canvas;
        this._window.requestAnimationFrame(() => {
            this.render();
        })
    }

    get scene(): SceneInterface {
        return this._scene;
    }

    get camera(): Camera {
        return this._camera;
    }

    get canvas(): Canvas {
        return this._canvas;
    }

    render() {
        this.canvas.clear();
        const polygons = this.scene.elements.map((element) => element.getPolygons()).flat();

        /** Sort polygons based on distance to camera */
        polygons.sort((first: Polygon, second: Polygon) => {
            return first.center.distanceTo(this.camera.position) > second.center.distanceTo(this.camera.position) ? -1 : 1;
        });


        polygons.forEach((polygon: Polygon) => {
            const points = polygon.points;
            const points2d: Vertex[] = [];
            const visiblePoints: Vertex[] = [];

            points.forEach((point) => {
                const product = multiplyVertexByMatrix(point, this.camera.viewMatrix.matrix);
                const point2d = multiplyVertexByMatrix(product, this.camera.projectionMatrix.matrix);
                points2d.push(point2d);
                if ( point2d.x >= -1 &&  point2d.x <= 1 &&  point2d.y >= -1 &&  point2d.y <= 1 && product.z > 0) {
                    visiblePoints.push(point2d);
                }
            });

            if (visiblePoints.length > 0) {
                const polygon2d = new Polygon(points2d[0], points2d[1], points2d[2]);
                polygon2d.color = polygon.color;
                if (!isFacedBackwards(polygon2d)) {
                    this.canvas.drawPolygon(polygon2d);
                }
            }
        });

        this._window.requestAnimationFrame(() => {
            this.render();
        })
    }
}
