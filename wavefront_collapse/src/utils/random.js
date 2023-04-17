// https://stackoverflow.com/a/7228322/8346513
export function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}