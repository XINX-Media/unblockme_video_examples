const fs = require("fs");
const path = require("path");
const { createInterface } = require('readline');

(async () => {
    function getNextBuffer() {
        return path.join(__dirname, `buffer${fileNum++}.txt`);
    }
    
    let fileNum = 0;
    let bufferFile = getNextBuffer();
    if (fileNum === 0) {
        const file = path.join(__dirname, "input.txt");
        const content = fs.readFileSync(file, "utf8");

        let nums = content.split(" ").map(str => parseInt(str, 10));

        let bufferHandle = fs.openSync(bufferFile, "w");
        for (const num of nums) {
            fs.writeSync(bufferHandle, `${num}\n`);
        }
        fs.closeSync(bufferHandle);
    }

    for (let i=fileNum;i<75;i++) {
        console.log(i);
        const stream = fs.createReadStream(bufferFile);
        bufferFile = getNextBuffer();
        bufferHandle = fs.openSync(bufferFile, "w");

        const rl = createInterface({
            input: stream,
            crlfDelay: Infinity,
        });
        
        for await (const line of rl) {
            const num = parseInt(line, 10);
            if (num === 0) {
                fs.writeSync(bufferHandle, `1\n`);
                continue;
            }
            const strNum = `${num}`;
            if (strNum.length % 2 === 0) {
                const firstNum = parseInt(strNum.substring(0, strNum.length/2));
                const secondNum = parseInt(strNum.substring(strNum.length/2));
                fs.writeSync(bufferHandle, `${firstNum}\n`);
                fs.writeSync(bufferHandle, `${secondNum}\n`);
                continue;
            }

            fs.writeSync(bufferHandle, `${num * 2024}\n`);
        }

        stream.close();
        fs.closeSync(bufferHandle);
    }

    console.log("All done!");
})();