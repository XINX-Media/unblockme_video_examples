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
    let result = "";
    if (!(
        startY < 0 ||
        startY >= letterGrid.length ||
        startX < 0 ||
        startX >= letterGrid[startY].length
    )) {
        result += letterGrid[startY][startX];
    }
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

let totalMas = 0;
for (let y=0;y<letterGrid.length;y++) {
    const line = letterGrid[y];
    for (let x=0;x<line.length;x++) {
        const char = letterGrid[y][x];
        
        if (char === "A") {
            const positions = [
                [-1, -1, 1, 1],
                [-1, 1, 1, -1],
            ];
            let isValid = true;
            for (const position of positions) {
                const startX = x + position[0];
                const startY = y + position[1];
                //console.log(x, y, position, startX, startY);
                const str = getStringInDirection(startX, startY, position[2],position[3], 3);
                //console.log(str);
                if (str !== "MAS" && str !== "SAM") {
                    isValid = false;
                    break;
                }
            }
            if (isValid) {
                totalMas ++;
            }
        }
    }
}

console.log("Total count of X-MAS strings:", totalMas);