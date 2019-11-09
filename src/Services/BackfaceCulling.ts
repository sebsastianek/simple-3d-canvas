import Polygon from "../WorldObjects/Polygon";


const isFacedBackwards = (polygon: Polygon): boolean => {
    return ((polygon.second.x - polygon.first.x) * (polygon.third.y - polygon.first.y) - (polygon.second.y - polygon.first.y) * (polygon.third.x - polygon.first.x)) > 0
};

export {
    isFacedBackwards
}