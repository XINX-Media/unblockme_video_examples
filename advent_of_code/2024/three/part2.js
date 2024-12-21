const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "input1.code");

const code = fs.readFileSync(file, "utf8");

let matches = code.matchAll(/((mul)\(([0-9]+),([0-9]+)\)|(do)\(\)|(don't)\(\)){1}/gm);
matches = Array.from(matches).map((match) => match.filter(item => item !== undefined));

let total = 0;
let active = true;
for (const match of matches) {
    const operation = match[2];
    if (operation === "mul") {
        if (!active) {
            continue;
        }
        const num1 = parseInt(match[3]);
        const num2 = parseInt(match[4]);

        const result = num1 * num2;

        total += result;
    } else if (operation === "don't") {
        active = false;
    } else if (operation == "do") {
        active = true;
    }
};

console.log("Total of all mul is", total);