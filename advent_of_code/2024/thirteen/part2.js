const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, process.argv[2]);
const contents = fs.readFileSync(file, "utf8");

const MAX_PRESSES = 100;
const A_TOKENS = 3;
const B_TOKENS = 1;
const SENTINEL = 10000000000000000000;
const PRIZE_OFFSET = 10000000000000;

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
    machineData['prize'] = { x: x + PRIZE_OFFSET, y: y + PRIZE_OFFSET };

    machinesData.push(machineData);
}

let totalScore = 0;
for (let i=0;i<machinesData.length;i++) {
    const machineData = machinesData[i];
    const y = machineData.prize.y;
    const e = machineData.button_a.y;
    const x = machineData.prize.x;
    const q = machineData.button_a.x;
    const w = machineData.button_b.x;
    const d = machineData.button_b.y;

    const b = (y - e*x/q) / (-1*e*w/q + d);
    const a = (x-w*b) / q;

    if (a === Math.floor(a) && b === Math.floor(b)) {
        const totalTokens = a * A_TOKENS + b * B_TOKENS;
        totalScore += totalTokens;
        console.log(i, a, b);
    }
}

console.log(`Total Score: ${totalScore}`);