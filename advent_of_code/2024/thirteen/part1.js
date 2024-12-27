const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, process.argv[2]);
const contents = fs.readFileSync(file, "utf8");

const MAX_PRESSES = 100;
const A_TOKENS = 3;
const B_TOKENS = 1;
const SENTINEL = 10000000000000000000;

const blocks = contents.split("\n\n");

const machinesData = [];
for (const block of blocks) {
    const lines = block.split("\n");

    const machineData = {};

    let [header, contents] = lines[0].split(": ");
    let contentList = contents.split(", ");
    let x = parseInt(contentList[0].substring(2), 10);
    let y = parseInt(contentList[1].substring(2), 10);
    machineData['button_a'] = { x, y};

    [header, contents] = lines[1].split(": ");
    contentList = contents.split(", ");
    x = parseInt(contentList[0].substring(2), 10);
    y = parseInt(contentList[1].substring(2), 10);
    machineData['button_b'] = { x, y};

    [header, contents] = lines[2].split(": ");
    contentList = contents.split(", ");
    x = parseInt(contentList[0].substring(2), 10);
    y = parseInt(contentList[1].substring(2), 10);
    machineData['prize'] = { x, y };

    machinesData.push(machineData);
}

let totalScore = 0;
for (const machineData of machinesData) {
    //console.log('machine now');
    //console.log(machineData);
    let smallestTokens = SENTINEL;
    for (let a=1;a<=MAX_PRESSES;a++) {
        for (let b=1;b<=MAX_PRESSES;b++) {
            const x = machineData.button_a.x * a + machineData.button_b.x * b;
            const y = machineData.button_a.y * a + machineData.button_b.y * b;

            if (x > machineData.prize.x || y > machineData.prize.y) {
                break;
            }
            //console.log(x, y, machineData.prize.x, machineData.prize.y);
            if (x === machineData.prize.x && y === machineData.prize.y) {
                const totalTokens = a * A_TOKENS + b * B_TOKENS;
                //console.log('here with', totalTokens);
                smallestTokens = Math.min(smallestTokens, totalTokens);
            }
        }
    }

    if (smallestTokens !== SENTINEL) {
        totalScore += smallestTokens;
    }
}

console.log(`Total Score: ${totalScore}`);