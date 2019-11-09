

const randomColor = (): string => {
    return 'rgba(' + Math.floor(Math.random() * 256) + ', 	' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ', 1)';
};

export {
    randomColor
}