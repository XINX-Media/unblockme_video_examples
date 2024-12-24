const fs = require('fs');
const path = require("path");

const file = path.join(__dirname, "input.disk");
const contents = fs.readFileSync(file, "utf8");

const disk = [];
let currentId = 0;
for (let i=0;i<contents.length;i++) {
    const num = parseInt(contents[i], 10);
    if (i % 2 === 0) {
        // file block
        for (let j=0;j<num;j++) {
            disk.push(currentId);
        }
        currentId ++;
    } else {
        // disk block
        for (let j=0;j<num;j++) {
            disk.push(-1);
        }
    }
}

let startPointer = 0;
let endPointer = disk.length-1;

while (true) {
    while (disk[endPointer] === -1) {
        endPointer --;
    }
    if (startPointer >= endPointer) {
        break;
    }
    const startItem = disk[startPointer];
    if (startItem === -1) {
        //console.log('moving item');
        const temp = disk[endPointer];
        disk[endPointer] = disk[startPointer];
        disk[startPointer] = temp;
        //console.log(temp);
    }

    startPointer ++;
}

let checksum = 0;
for (let i=0;i<disk.length;i++) {
    const block = disk[i];
    if (block == -1) {
        //console.log(i, 'skip', block);
        continue;
    }

    //console.log(i, 'add', block);

    checksum += i * block;
}

console.log("Final checksum is", checksum);