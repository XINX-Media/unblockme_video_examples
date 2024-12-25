// this is another possibility for how to make this work, breaking up the arrays
// into smaller arrays to avoid going over the max cap of array length.
// This does take much less time. Unfortunately it also causes my computer to run
// out of memory (12 gb is not enough to complete the sequence)

const fs = require("fs");
const path = require("path");

const MAX_ITEMS = 1000000;

const file = path.join(__dirname, "sample.txt");
const content = fs.readFileSync(file, "utf8");

let nums = content.split(" ").map(str => parseInt(str, 10));
let allNums = [nums];

for (let i=0;i<75;i++) {
    let count = 0;
    for (const line of allNums) {
        count += line.length;
    }
    console.log(i, count);

    let newNums = [];
    const newAllNums = [];

    const pushNum = (num) => {
        newNums.push(num);
        if (newNums.length > MAX_ITEMS) {
            newAllNums.push(newNums);
            newNums = [];
        }
    }

    let processed = 0;
    for (let j=0;j<allNums.length;j++) {
        nums = allNums[j];
        for (const num of nums) {
            if (num === 0) {
                pushNum(1);
                continue;
            }
            const strNum = `${num}`;
            if (strNum.length % 2 === 0) {
                const firstNum = parseInt(strNum.substring(0, strNum.length/2));
                const secondNum = parseInt(strNum.substring(strNum.length/2));
                pushNum(firstNum);
                pushNum(secondNum);
                continue;
            }

            pushNum(num * 2024);
            processed ++;

            if (processed % 10000000 === 0) {
                console.log(`${processed}/${count}`);
            }
        }

        if (newNums.length > 0) {
            newAllNums.push(newNums);
            newNums = [];
        }
        // reset old numbers to clear memory
        allNums[j] = [];
    }

    allNums = newAllNums;
    
    //console.log(allNums);
}

for (const line of allNums) {
    for (const item of line) {
        //console.log(item);
    }
}

let sum = allNums.reduce((acc, nums) => acc + nums.length, 0);

console.log("Stones at end", sum);