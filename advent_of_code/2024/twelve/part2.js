const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "input.map");

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
    //let totalPerimeter = 0;
    const sideSet = {};
    const addSide =(key, extra) => {
        if (!sideSet[key]) {
            sideSet[key] = new Set();
        }
        sideSet[key].add(extra);
    }
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
            if (nx < 0 || nx >= map[0].length) {
                addSide(`x${x}->${nx}`, ny);
                continue;
            }
            if (ny < 0|| ny >= map.length) {
                addSide(`y${y}->${ny}`, nx);
                continue;
            }
            if (map[ny][nx] !== map[y][x]) {
                //if (y == 0) {
                    //console.log('checking', nx, ny, x, y, map[ny][nx], map[y][x]);
                //}
                if (nx !== x) {
                    addSide(`x${x}->${nx}`, ny);
                } else if (ny !== y) {
                    addSide(`y${y}->${ny}`, nx);
                }
                //console.log(sideSet);
            }
        }
        //console.log(x, y, 'done',sideSet);

        //const perimeter = 4 - neighborCount;
        //totalPerimeter += perimeter;
    }

    //console.log(type, sideSet);

    let totalRuns = 0;
    for (const key in sideSet) {
        const value = [...sideSet[key]];
        value.sort((a, b) => {
            return a-b;
        });
        let runs = 1;
        for (let i=1; i<value.length; i++) {
            if (value[i] - value[i-1] !== 1) {
                //console.log(value);
                //console.log(value[i], value[i-1], key);
                runs ++;
            }
        }
        totalRuns += runs;
    }

    const cost = area.length * totalRuns
    //console.log(sideSet);
    console.log(`Area of type ${type}: ${area.length}, Perimeter: ${totalRuns}, Cost: ${cost}`);
    totalCost += cost;
}

console.log("Total cost", totalCost);