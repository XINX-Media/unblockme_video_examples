const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "input1.txt");

const contents = fs.readFileSync(file, "utf8");
const [pageRuleString, updatesString] = contents.split("\n\n");

const pageRulesArray = pageRuleString.split("\n");
const pageRulesMap = {};
for (const pageRule of pageRulesArray) {
    pageRulesMap[pageRule] = true;
}

const updatesArray = updatesString.split("\n");

function checkValid(updateItems) {
    for (let i=0;i<updateItems.length;i++) {
        for (let j=i+1;j<updateItems.length;j++) {
            const key = `${updateItems[i]}|${updateItems[j]}`;
            //console.log(key);
            if (!pageRulesMap[key]) {
                return [false, i, j];
            }
        }
    }

    return [true];
}

let totalMiddle = 0;
for (const update of updatesArray) {
    const updateItems = update.split(",");
    let validCheck = checkValid(updateItems);

    //console.log(validCheck);

    if (!validCheck[0]) {

        while (!validCheck[0]) {
            //console.log(updateItems);
            // attempt a fix
            const i = validCheck[1];
            const j = validCheck[2];
            const temp = updateItems[i];
            updateItems[i] = updateItems[j];
            updateItems[j] = temp;
            validCheck = checkValid(updateItems);
        }

        //console.log(update);
        const middleIndex = Math.floor(updateItems.length / 2);
        const middle = parseInt(updateItems[middleIndex], 10);
        totalMiddle += middle;

        //break;
    }
}

console.log("The total middle is", totalMiddle);