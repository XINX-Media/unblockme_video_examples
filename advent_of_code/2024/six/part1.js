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

let guardX = 0;
let guardY = 0;
const guardWalkPath = [];
for (let i=0;i<map.length;i++) {
    const path = [];
    for (let j=0;j<map[i].length;j++) {
        let number = 0;
        if (map[i][j] === "^") {
            guardX = j;
            guardY = i;
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

let currentDirection = 0;

while (true) {
    const offset = offsets[currentDirection];
    const nextX = guardX + offset[0];
    const nextY = guardY + offset[1];

    //console.log(guardX, guardY);

    if (nextX < 0 || nextX >= map[0].length || nextY < 0 || nextY >= map.length) {
        break;
    }

    //console.log(map[nextX][nextY]);

    if (map[nextY][nextX] === "#") {
        currentDirection = (currentDirection + 1) % offsets.length;
        continue;
    } else {
        guardX = nextX;
        guardY = nextY;
        guardWalkPath[guardY][guardX] = 1;
    }
}

let totalWalked = 0;
for (const line of guardWalkPath) {
    totalWalked += line.reduce((acc, val) => acc + val, 0);
}

console.log("Total walked by guard:", totalWalked);