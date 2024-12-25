const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "sample.map");

const contents = fs.readFileSync(file, "utf8");
const lines = contents.split("\n");

const map = [];
for (const line of lines) {
    map.push(line.split(""));
}

const processed = {};

function getArea(x, y) {
    if (x < 0 || y < 0 || y >= map.length || x >= map[y].length) {
        return [];
    }

    const key = `${x}_${y}`;

    const neighbors = [
        [x-1, y],
        [x+1, y],
        [x, y-1],
        [x, y+1]
    ];

    processed[key] = true;

    const allCoords = [
        [x, y],
    ];
    for (const neighbor of neighbors) {
        const [nx, ny] = neighbor;
        if (nx < 0 || ny < 0 || ny >= map.length || nx >= map[ny].length) {
            continue;
        }
        const neighborKey = `${nx}_${ny}`;
        if (map[ny][nx] !== map[y][x] || processed[neighborKey]) {
            continue;
        }
        const childCoords = getArea(nx, ny);
        allCoords.push(...childCoords);
    }

    return allCoords;
}

const areas = [];
for (let y=0;y<map.length;y++) {
    for (let x=0;x<map[y].length;x++) {
        const key = `${x}_${y}`;

        if (processed[key]) {
            continue;
        }

        const area = getArea(x, y);

        areas.push([map[y][x], area]);
    }
}

let totalCost = 0;
for (const areaData of areas) {
    const [type, area] = areaData;
    let totalPerimeter = 0;
    for (const coord of area) {
        const [x, y] = coord;
        let neighborCount = 0;
        const neighbors = [
            [x-1, y],
            [x+1, y],
            [x, y-1],
            [x, y+1]
        ];

        for (const neighbor of neighbors) {
            const [nx, ny] = neighbor;
            if (nx < 0 || ny < 0 || ny >= map.length || nx >= map[ny].length) {
                continue;
            }
            //console.log('checking', nx, ny, map[ny][nx], map[y][x]);
            if (map[ny][nx] === map[y][x]) {
                neighborCount ++;
            }
        }
        //console.log(x, y, neighborCount);

        const perimeter = 4 - neighborCount;
        totalPerimeter += perimeter;
    }

    const cost = area.length * totalPerimeter;
    console.log(`Area of type ${type}: ${area.length}, Perimeter: ${totalPerimeter}, Cost: ${cost}`);
    totalCost += cost;
}

console.log("Total cost", totalCost);