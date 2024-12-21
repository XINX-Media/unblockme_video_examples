const fs = require("fs");
const path = require("path");

const inputFile = path.join(__dirname, "input.csv");

const contents = fs.readFileSync(inputFile, "utf8");
const lines = contents.split("\n");

const list1 = [];
const list2 = [];
for (const line of lines) {
    const [item1, item2] = line.split(",");

    list1.push(parseInt(item1));
    list2.push(parseInt(item2));
}

list1.sort();
list2.sort();

let totalDistance = 0;
for (let i=0;i<list1.length;i++) {
    const item1 = list1[i];
    const item2 = list2[i];

    const distance = Math.abs(item1 - item2);

    totalDistance += distance;
}

console.log("Total distance:", totalDistance);