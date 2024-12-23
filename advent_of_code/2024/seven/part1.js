const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "input1.txt");
const contents = fs.readFileSync(file, "utf8");

const lines = contents.split("\n");

const operators = ['+', '*'];

function addOperators(list, position) {
    //console.log(position, list.length);
    if (position >= list.length-1) {
        return [list];
    }

    let allResults = [];

    for (const operator of operators) {
        const copy = [...list];
        copy.splice(position+1, 0, operator);

        //console.log(copy);
        const results = addOperators(copy, position+2);
        allResults = [...allResults, ...results];
    }

    return allResults;
}

let totalTrue = 0;
for (const line of lines) {
    const [answerString, numbersStr] = line.split(": ");
    const answer = parseInt(answerString, 10);

    const numbers = numbersStr.split(" ").map((str) => parseInt(str, 10));

    const toCheck = addOperators(numbers, 0);
    for (const combination of toCheck) {
        let sum = 0;
        let currentOperator = "+";
        for (const item of combination) {
            if (item === "+" || item === "*") {
                currentOperator = item;
            } else {
                if (currentOperator === "+") {
                    sum += item;
                } else if (currentOperator === "*") {
                    sum *= item;
                }
            }
        }

        if (sum === answer) {
            totalTrue += answer;
            break;
        }
    }
}

console.log("Sum of true calibrations:", totalTrue);