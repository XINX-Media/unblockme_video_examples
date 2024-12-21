const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "input1.code");

const code = fs.readFileSync(file, "utf8");

const matches = code.matchAll(/(mul\(([0-9]+),([0-9]+)\)){1}/gm);

const total = Array.from(matches).reduce((sum, match) => {
    const num1 = parseInt(match[2]);
    const num2 = parseInt(match[3]);

    const result = num1 * num2;

    return sum + result;
}, 0);

console.log("Total of all mul is", total);