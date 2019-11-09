

const degreesToRadians = (degrees: number): number =>  {
    return degrees * (Math.PI/180);
};

const randomSign = (): number => {
    return Math.random() < 0.5 ? -1 : 1;
};

export {
    degreesToRadians,
    randomSign
}