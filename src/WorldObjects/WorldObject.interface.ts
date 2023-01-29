import Polygon from "./Polygon";
import Vertex from "../Vertex";


export interface WorldObjectInterface
{
    getPolygons: () => Polygon[]
    createPolygons: () => void;
    color: string;
    center: Vertex;
}
