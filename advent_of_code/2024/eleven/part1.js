const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "sample.txt");
const content = fs.readFileSync(file, "utf8");

let nums = content.split(" ").map(str => parseInt(str, 10));

for (let i=0;i<25;i++) {
    console.log(i, nums.length);
    const newNums = [];
    for (const num of nums) {
        if (num === 0) {
            newNums.push(1);
            continue;
        }
        const strNum = `${num}`;
        if (strNum.length % 2 === 0) {
            const firstNum = parseInt(strNum.substring(0, strNum.length/2));
            const secondNum = parseInt(strNum.substring(strNum.length/2));
            newNums.push(firstNum);
            newNums.push(secondNum);
            continue;
        }

        newNums.push(num * 2024);
    }

    //console.log(newNums);
    nums = newNums;
}

//console.log(nums);

for (const num of nums) {
    //console.log(num);
}

console.log("Stones at end", nums.length);