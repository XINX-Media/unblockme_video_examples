const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "data1.txt");
const contents = fs.readFileSync(filePath, "utf8");
const lines = contents.split("\n");

const reports = lines.map((line) => {
    return line.split(" ").map((item) => parseInt(item, 10));
});

let totalSafe = 0;
for (const report of reports) {
    //console.log(report, isDescending);
    let isAnySafe = false;
    for (let i=0;i<report.length;i++) {
        const reportCopy = [...report];
        reportCopy.splice(i, 1);

        let isSafe = true;
        const isDescending = reportCopy[0]-reportCopy[1] > 0;
        for (let i=1;i<reportCopy.length;i++) {
            const prev =  reportCopy[i-1];
            const item = reportCopy[i];
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
            isAnySafe = true;
            break;
        }
    }

    if (isAnySafe) {
        totalSafe ++;
    }
}

console.log("Total safe reports:", totalSafe);