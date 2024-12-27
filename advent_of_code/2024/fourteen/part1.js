const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, process.argv[2]);
const contents = fs.readFileSync(file, "utf8");

const lines = contents.split("\n");
const [width, height] = lines[0].split(",").map(i => parseInt(i));

const robots = [];
for (let i=1;i<lines.length;i++) {
    const [position, velocity] = lines[i].split(" ");

    const [px, py] = position.substring(2).split(",").map(i => parseInt(i));
    const [vx, vy] = velocity.substring(2).split(",").map(i => parseInt(i));

    robots.push({
        velocity: { x: vx, y: vy },
        position: { x: px, y: py },
    });
}

function drawMap() {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width;x++) {
            let char = ".";

            let robotCount = 0;
            for (const robot of robots) {
                if (robot.position.x === x && robot.position.y === y) {
                    robotCount++;
                }
            }

            if (robotCount > 0) {
                char = `${robotCount}`;
            }

            process.stdout.write(char);
        }
        console.log();
    }
    console.log();
}

//drawMap();

for (let i=0;i<100;i++) {
    for (const robot of robots) {
        let nextX = robot.position.x + robot.velocity.x;
        let nextY = robot.position.y + robot.velocity.y;

        if (nextX < 0) {
            nextX += width;
        }
        if (nextY < 0) {
            nextY += height;
        }

        nextX = nextX % width;
        nextY = nextY % height;

        robot.position.x = nextX;
        robot.position.y = nextY;
    }
}

//drawMap();

const xMid = Math.floor(width / 2);
const yMid = Math.floor(height / 2);

const quads = [0,0,0,0];

for (const robot of robots) {
    if (robot.position.x < xMid && robot.position.y < yMid) {
        quads[0]++;
    } else if (robot.position.x > xMid && robot.position.y < yMid) {
        quads[1]++;
    } else if (robot.position.x > xMid && robot.position.y > yMid) {
        quads[2]++;
    } else if (robot.position.x < xMid && robot.position.y > yMid) {
        quads[3]++;
    }
}

const securityScore = quads.reduce((sum, num) => sum * num, 1);

console.log(`Final security score is ${securityScore}`);