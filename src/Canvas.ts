import Vertex from "./Vertex";
import Polygon from "./WorldObjects/Polygon";


export default class Canvas {
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;
    private _width: number;
    private _height: number;

    constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
        this._ctx = canvas.getContext("2d");
        this._width = canvas.width;
        this._height = canvas.height;
    }

    get canvas(): HTMLCanvasElement {
        return this._canvas;
    }

    set canvas(value: HTMLCanvasElement) {
        this._canvas = value;
    }

    get width(): number {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
    }

    get height(): number {
        return this._height;
    }

    set height(value: number) {
        this._height = value;
    }

    get ctx(): CanvasRenderingContext2D {
        return this._ctx;
    }

    set ctx(value: CanvasRenderingContext2D) {
        this._ctx = value;
    }

    normalizeX(x: number): number {
        return (x + 1) * 0.5 * this.width
    }

    normalizeY(y: number): number {
        return (1 - (y + 1) * 0.5) * this.height;
    }

    clear(): void {
        this.ctx.clearRect(0,0, this.width, this.height);
    }

    drawPolygon(polygon: Polygon) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.normalizeX(polygon.first.x), this.normalizeY(polygon.first.y));
        this.ctx.lineTo(this.normalizeX(polygon.second.x), this.normalizeY(polygon.second.y));
        this.ctx.lineTo(this.normalizeX(polygon.third.x), this.normalizeY(polygon.third.y));
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.fillStyle= polygon.color;
        this.ctx.fill();
    }
}