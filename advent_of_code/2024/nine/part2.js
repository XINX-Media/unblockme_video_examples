const fs = require('fs');
const path = require("path");

const file = path.join(__dirname, "input.disk");
const contents = fs.readFileSync(file, "utf8");

const disk = [];
let currentId = 0;
for (let i=0;i<contents.length;i++) {
    const num = parseInt(contents[i], 10);
    if (i % 2 === 0) {
        disk.push({
            id: currentId,
            size: num,
        });
        currentId ++;
    } else {
        disk.push({
            id: -1,
            size: num,
        });
    }
}

//console.log(disk);

for (let i=disk.length-1;i>=0;i--) {
    const block = disk[i];
    if (block.id === -1) {
        continue;
    }

    for (let j=0;j<i;j++) {
        const block2 = disk[j];
        if (block2.id !== -1) {
            continue;
        }

        if (block2.size < block.size) {
            continue;
        }

        disk.splice(i, 1, { id: -1, size: block.size });
        disk.splice(j, 0, block);
        const newSize = block2.size - block.size;
        if (newSize === 0) {
            // remove empty space
            disk.splice(j+1, 1);
        } else {
            block2.size -= block.size;
        }
        break;
    }
}

//console.log(disk);

let checksum = 0;
let index = 0;
for (let i=0;i<disk.length;i++) {
    const block = disk[i];
    if (block.id == -1) {
        index += block.size;
        //console.log(i, 'skip', block);
        continue;
    }

    //console.log(i, 'add', block);

    for (let i=index;i<index+block.size;i++) {
        checksum += i * block.id;
    }
    index += block.size;
}

console.log("Final checksum is", checksum);