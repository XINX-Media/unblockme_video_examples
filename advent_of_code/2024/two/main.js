const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "data.txt");
const contents = fs.readFileSync(filePath, "utf8");
const lines = contents.split("\n");

const reports = lines.map((line) => {
    return line.split(" ").map((item) => parseInt(item, 10));
});

let totalSafe = 0;
for (const report of reports) {
    let isSafe = true;
    const isDescending = report[0]-report[1] > 0;
    //console.log(report, isDescending);
    for (let i=1;i<report.length;i++) {
        const prev =  report[i-1];
        const item = report[i];
        const distance = Math.abs(prev-item);
        const isDescendingTemp = prev-item > 0;

        //console.log(item, isDescendingTemp);

        if (isDescending != isDescendingTemp) {
            isSafe = false;
            break;
        }

        if (distance < 1 || distance > 3) {
            isSafe = false;
            break;
        }
    }

    if (isSafe) {
        totalSafe ++;
    }
}

console.log("Total safe reports:", totalSafe);