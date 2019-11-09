import Polygon from "./Polygon";


export interface WorldObjectInterface
{
    getPolygons: () => Polygon[]
}