const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "input1.map");

const content = fs.readFileSync(file, "utf8");
const lines = content.split("\n");

const antennaMap = {};
const height = lines.length;
let width;
lines.forEach((line, y) => {
    width = line.split("").length;
    line.split("").forEach((item, x) => {
        if (item !== ".") {
            if (!antennaMap[item]) {
                antennaMap[item] = [];
            }

            antennaMap[item].push({ x, y });
        }
    });
});

const invertedMap = {};
for (const antenna in antennaMap) {
    antennaMap[antenna].forEach(coord => {
        const key = `${coord.x}_${coord.y}`;
        invertedMap[key] = antenna;
    });
}

const antiPairs = {};
for (const antenna in antennaMap) {
    //if (antenna !== "2") continue;
    const coords = antennaMap[antenna];
    for (let i=0;i<coords.length;i++) {
        for (let j=i+1;j<coords.length;j++) {
            const point1 = coords[i];
            const point2 = coords[j];

            //console.log(point1, point2);

            const slope = (point1.y - point2.y) / (point1.x - point2.x);
            const intercept = point1.y - (slope * point1.x);

            const distX = Math.abs(point1.x - point2.x);
            const distY = Math.abs(point1.y - point2.y);

            //console.log(distX, distY);

            if (distX >= distY) {
                const smallX = Math.min(point1.x, point2.x);
                const antiX1 = Math.round(smallX - distX);
                const antiY1 = Math.round(slope * antiX1 + intercept);
                //console.log(antiX1, antiY1);
                if (antiX1 >= 0 && antiX1 < width && antiY1 >= 0 && antiY1 < height) {
                    const key = `${antiX1}_${antiY1}`;
                    antiPairs[key] = antenna;
                }

                const greatX = Math.max(point1.x, point2.x);
                const antiX2 = Math.round(greatX + distX);
                const antiY2 = Math.round(slope * antiX2 + intercept);
                //console.log(antiX2, antiY2);
                if (antiX2 >= 0 && antiX2 < width && antiY2 >= 0 && antiY2 < height) {
                    const key = `${antiX2}_${antiY2}`;
                    antiPairs[key] = antenna;
                }
            } else {
                const smallY = Math.min(point1.y, point2.y);
                const antiY1 = Math.round(smallY - distY);
                const antiX1 = Math.round((antiY1 - intercept) / slope);
                if (antiX1 >= 0 && antiX1 < width && antiY1 >= 0 && antiY1 < height) {
                    const key = `${antiX1}_${antiY1}`;
                    antiPairs[key] = antenna;
                }

                const greatY = Math.max(point1.y, point2.y);
                const antiY2 = Math.round(greatY + distY);
                const antiX2 = Math.round((antiY2 - intercept) / slope);
                if (antiX2 >= 0 && antiX2 < width && antiY2 >= 0 && antiY2 < height) {
                    const key = `${antiX2}_${antiY2}`;
                    antiPairs[key] = antenna;
                }
            }
        }
    }
}

const antennaTypes = Object.keys(antennaMap);
const checkKey = antennaTypes[2];
/*
for (let y = 0;y<height;y++) {
    for (let x=0;x<width;x++) {
        const key = `${x}_${y}`;
        const foundAntenna = invertedMap[key];
        if (foundAntenna/* && foundAntenna === checkKey) {
            process.stdout.write(foundAntenna);
        } else if (antiPairs[key]/* === checkKey) {
            process.stdout.write("#");
        } else {
         process.stdout.write(".");
        }
    }
    console.log();
}*/

console.log("Count of anti pairs: " + Object.keys(antiPairs).length);