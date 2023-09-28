const contentHolder = document.getElementById("content");

const names = ["Bob", "Jen", "Casey", "Travis", "Sarah"];

// Adapted from https://stackoverflow.com/a/7228322
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function createEntry() {
    const nameIndex = randomIntFromInterval(0, names.length-1);
    const name = names[nameIndex];

    if (name === undefined) {
        debugger;
    }

    const container = document.createElement("div");
    container.classList.add("name_container");
    container.innerText = name;

    contentHolder.appendChild(container);
}

for (let i=0;i<1000;i++) {
    createEntry();
}