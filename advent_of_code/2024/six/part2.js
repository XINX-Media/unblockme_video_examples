const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "input1.map");

const contents = fs.readFileSync(file, "utf8");
const lines = contents.split("\n");

const map = [];
for (const line of lines) {
    map.push(line.split(""));
}

function renderArray(array) {
    for (const row of array) {
        console.log(row.join(""));
    }
    console.log();
}

function copyArray(array) {
    const newArray = [];
    for (const row of array) {
        newArray.push([...row]);
    }

    return newArray;
}

let startGuardX = 0;
let startGuardY = 0;
const guardWalkPath = [];
for (let i=0;i<map.length;i++) {
    const path = [];
    for (let j=0;j<map[i].length;j++) {
        let number = 0;
        if (map[i][j] === "^") {
            startGuardX = j;
            startGuardY = i;
            number = 1;
        }
        path.push(number);
    }
    guardWalkPath.push(path);
}

const offsets = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
];

let loopPositions = 0;
for (let y=0;y<map.length;y++) {
    for (let x=0;x<map[y].length;x++) {
        const cloneMap = copyArray(map);
        cloneMap[y][x] = "#";
        const turns = {};
        let guardX = startGuardX;
        let guardY = startGuardY;
        let currentDirection = 0;
       // console.log('starting');
        while (true) {
            const offset = offsets[currentDirection];
            const nextX = guardX + offset[0];
            const nextY = guardY + offset[1];

            //console.log(guardX, guardY);

            if (nextX < 0 || nextX >= cloneMap[0].length || nextY < 0 || nextY >= cloneMap.length) {
                break;
            }

            //console.log(map[nextX][nextY]);

            if (cloneMap[nextY][nextX] === "#") {
                const turnKey = `${guardX},${guardY},${currentDirection}`;
                if (turns[turnKey]) {
                    loopPositions++;
                    //console.log(turnKey, x, y, turns);
                    break;
                } else {
                    //console.log('adding', turnKey);
                }
                currentDirection = (currentDirection + 1) % offsets.length;
                turns[turnKey] = true;
                continue;
            } else {
                guardX = nextX;
                guardY = nextY;
            }
        }
    }
}

console.log("Loop positions:", loopPositions);