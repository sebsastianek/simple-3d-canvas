import {randomSign} from "./Math";


const randomColor = (): string => {
    return 'rgb(' + Math.floor(Math.random() * 256) + ', 	' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ')';
};

const randomizeRgbString = (rgb: string): string => {
    rgb = rgb.replace('rgb(', '').replace(')', '');
    return 'rgb(' + rgb.split(',').map((elem) => Math.min(Math.max(parseInt(elem) + randomSign() * 5, 0), 255)) + ')';
}

export {
    randomColor,
    randomizeRgbString
}
