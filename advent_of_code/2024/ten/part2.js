const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "input.map");

const contents = fs.readFileSync(file, "utf8");
const lines = contents.split("\n");

const map = [];
for (const line of lines) {
    map.push(line.split("").map((item) => parseInt(item, 10)));
}

//console.log(map);

function findTrails(x, y) {
    const myHeight = map[y][x];

    if (myHeight === 9) {
        return 1;
    }

    const neighbors = [
        [x-1, y],
        [x,y-1],
        [x+1, y],
        [x, y+1],
    ];

    let totalTrails = 0;
    for (const neighbor of neighbors) {
        const [nx, ny] = neighbor;

        if (nx >= 0 && nx < map[0].length && ny >= 0 && ny < map.length) {
            const height = map[ny][nx];

            if (height === myHeight+1) {
                const childResult = findTrails(nx, ny);
                totalTrails += childResult;
            }
        }
    }

    return totalTrails;
}

let totalScore = 0;
for (let y=0;y<map.length;y++) {
    for (let x=0;x<map[y].length;x++) {
        const num = map[y][x];

        if (num === 0) {
            const trailsFound = findTrails(x, y);
            totalScore += trailsFound;
        }
    }
    //break;
}

console.log("Total score:", totalScore);