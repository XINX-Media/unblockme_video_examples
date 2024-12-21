const fs = require("fs");
const path = require("path");

const inputFile = path.join(__dirname, "input1.csv");

const contents = fs.readFileSync(inputFile, "utf8");
const lines = contents.split("\n");

const list1 = [];
const list2 = [];
for (const line of lines) {
    const [item1, item2] = line.split(",");

    list1.push(parseInt(item1));
    list2.push(parseInt(item2));
}

const frequencyMap = {};

for (const item of list2) {
    if (frequencyMap[item]) {
        frequencyMap[item]++;
    } else {
        frequencyMap[item] = 1;
    }
}

let totalFrequency = 0;
for (const item of list1) {
    const frequency = frequencyMap[item] || 0;
    totalFrequency += item * frequency;
}

console.log("Total frequency is: " + totalFrequency);