const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "input1.txt");
const contents = fs.readFileSync(file, "utf8");

const letterGrid = [];

const lines = contents.split("\n");
for (const line of lines) {
    const letters = line.split("");
    letterGrid.push(letters);
}

function getStringInDirection(startX, startY, offX, offY, count) {
    let result = letterGrid[startY][startX];
    let currentX = startX;
    let currentY = startY;

    for (let i=0;i<count-1;i++) {
        currentX += offX;
        currentY += offY;

        if (
            currentY < 0 ||
            currentY >= letterGrid.length ||
            currentX < 0 ||
            currentX >= letterGrid[currentY].length
        ) {
            break;
        }

        result += letterGrid[currentY][currentX];
    }

    return result;
}

let totalXmas = 0;
for (let y=0;y<letterGrid.length;y++) {
    const line = letterGrid[y];
    for (let x=0;x<line.length;x++) {
        const char = letterGrid[y][x];
        
        if (char === "X") {
            const positions = [
                [1,0],[-1,0], [0, -1], [0, 1],
                [-1, -1], [1, -1], [1, 1], [-1, 1],
            ];
            for (const position of positions) {
                const str = getStringInDirection(x, y, position[0],position[1], 4);
                if (str === "XMAS") {
                    totalXmas ++;
                }
            }
        }
    }
}

console.log("Total count of XMAS strings:", totalXmas);