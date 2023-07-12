const fs = require("fs");

// non sync version
fs.readFileSync("input.txt", "utf8", (err, content) => {
    if (err) {
        console.error(err);
        return;
    }

    const newContent = `My new message is: ${content}, ${content}, ${content}\n`;

    // writeFile is called in much the same way, but it overwrites the file always
    fs.appendFile('output.txt', newContent, (err) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log("Wrote file!");
    });
});

// sync version
try {
    const content = fs.readFileSync("inpu.txt", "utf8");
    const newContent = `My new message is: ${content}, ${content}, ${content}\n`;

    fs.appendFileSync('output.txt', newContent);
} catch (error) {
    console.log("Error reading file");
}