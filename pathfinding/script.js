const EMPTY = 0;
const WALL = 1;
const START = 2;
const END = 3;
const LOOK_AT = 4;
const COMPLETE = 5;
const PATH = 6;

const COLORS = {
    [EMPTY]: "#fff",
    [WALL]: "#000",
    [START]: "#0f0",
    [END]: "#f00",
    [LOOK_AT]: "#ff0",
    [COMPLETE]: "#090",
    [PATH]: "#00f",
};

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const map = new Map("canvas", render, 400, 400);

function render() {
    shape(context, [
        {x:0,y:0},
        {x:canvas.width,y:0},
        {x:canvas.width,y:canvas.height},
        {x:0,y:canvas.height},
    ],"#fff",true);
    map.renderMap();
}

canvas.addEventListener("click", (e) => {
    const { offsetX: x, offsetY: y } = e;

    const coords = map.getCellFromReal(x, y);

    const value = map.tree.get(coords.x, coords.y);
    if (value === WALL) {
        map.tree.set(coords.x, coords.y, EMPTY);
    } else {
        map.tree.set(coords.x, coords.y, WALL);
    }

    map.drawMap();
    render();
});

map.tree.set(5, 5, 1);
map.tree.set(5, 6, 1);
map.tree.set(5, 7, 1);
map.tree.set(5, 8, 1);
map.tree.set(5, 9, 1);
map.tree.set(5, 10, 1);
map.tree.set(5, 11, 1);
map.tree.set(2, 8, START);
map.tree.set(10, 8, END);

map.drawMap();
render();

function distanceBetweenPoints(x, y, x2, y2) {
    return Math.sqrt(Math.pow(x-x2, 2) + Math.pow(y-y2, 2));
}

/*
c^2 = a^2 + b^2
c = sqrt(a^2 + b^2)
*/

const nodesToLookAt = new PriorityQueue();
nodesToLookAt.enqueue({x:2, y: 8, width: 1, height: 1, parent: null}, distanceBetweenPoints(2, 8, 10, 8));
nodesToLookAt.print();
const processedNodes = [];
let complete = false;

function astarStep() {
    if (complete) {
        return;
    }
    nodesToLookAt.print();
    const node = nodesToLookAt.dequeue();

    //console.log("processing", node);

    if (node.x === 10 && node.y === 8) {
        complete = true;

        const path = [];
        let current = node;
        while (current !== null) {
            map.tree.set(current.x, current.y, PATH);
            path.push(current);
            current = current.parent;
        }
    }

    map.tree.set(node.x, node.y, COMPLETE);
    processedNodes.push(node);

    const children = [
        {x:node.x-1, y:node.y, parent: node},
        {x:node.x, y:node.y-1, parent: node},
        {x:node.x+1, y:node.y, parent: node},
        {x:node.x, y:node.y+1, parent: node},
    ].filter((element) => {
        return (element.x >= 0 && element.x < 400/25 && element.y >= 0 && element.y < 400/25);
    }).filter((element) => {
        let found = false;

        const value = map.tree.get(element.x, element.y);
        if (value === WALL) {
            return false;
        }

        for (const processed of processedNodes) {
            if (processed.x === element.x && processed.y === element.y) {
                found = true;
                break;
            }
        }

        if (found ){
            return false;
        }

        found = nodesToLookAt.contains((node) => {
            return node.x === element.x && node.y === element.y;
        });
        return !found;
    });

    //console.log(children);

    for (const child of children) {
        map.tree.set(child.x, child.y, LOOK_AT);

        const distance = distanceBetweenPoints(child.x, child.y, 10, 8);
        child.distance = distance;
        nodesToLookAt.enqueue(child, distance);
    }

    map.tree.set(2, 8, START);
    map.tree.set(10, 8, END);

    map.drawMap();
    render();
}

document.getElementById("takeStep").addEventListener("click", () => {
    if (complete) {
        return;
    }
    //nodesToLookAt.print();
    const node = nodesToLookAt.dequeue();

    //console.log("processing", node);

    const goalNode = map.tree.getNodeAtCoordinate(10, 8);

    if (node === goalNode) {
        complete = true;

        const path = [];
        let current = node;
        while (current !== null) {
            current.value = PATH;
            path.push(current);
            current = current?.data?.parent ?? null;
        }
    }

    //map.tree.set(node.x, node.y, COMPLETE);

    const treeNode = map.tree.getNodeAtCoordinate(node.x, node.y);

    treeNode.value = COMPLETE;
    processedNodes.push(treeNode);

    let neighbors = [];
    for (let i=node.x;i<node.x+Math.max(1, node.width);i++) {
        neighbors.push({x:i, y:node.y-1, parent: node});
        neighbors.push({x:i, y:node.y+node.height, parent: node});
    }
    for (let i=node.y;i<node.y+Math.max(1, node.height);i++) {
        neighbors.push({x:node.x-1, y:i, parent: node});
        neighbors.push({x:node.x+node.height, y:i, parent: node});
    }

    neighbors = neighbors.filter((element) => {
        return (element.x >= 0 && element.x < 400/25 && element.y >= 0 && element.y < 400/25);
    }).map((child) => {
        return map.tree.getNodeAtCoordinate(child.x, child.y);
    }).filter((element) => {
        let found = false;

        if (element.value === WALL) {
            return false;
        }

        for (const processed of processedNodes) {
            //console.log(processed, element);
            if (processed === element) {
                found = true;
                break;
            }
        }

        if (found ){
            return false;
        }

        found = nodesToLookAt.contains((node) => {
            return node === element;
        });
        return !found;
    }).map((element) => {
        element.data = {
            parent: treeNode,
        };
        return element;
    })

    for (const child of neighbors) {
        child.value = LOOK_AT;
        //map.tree.set(child.x, child.y, LOOK_AT);

        let shortestDistance = null;
        const checkDistance = (newDistance) => {
            if (shortestDistance === null) {
                shortestDistance = newDistance;
            } else {
                shortestDistance = Math.min(newDistance, shortestDistance);
            }
        }
        for (let i=child.x;i<child.x+Math.max(1, child.width);i++) {
            checkDistance(distanceBetweenPoints(i, child.y, 10, 8));
            checkDistance(distanceBetweenPoints(i, child.y+child.height, 10, 8));
        }
        for (let i=child.y;i<child.y+Math.max(1, child.height);i++) {
            checkDistance(distanceBetweenPoints(child.x, i, 10, 8));
            checkDistance(distanceBetweenPoints(child.x+child.width, i, 10, 8));
        }

        //console.log(child, shortestDistance);

        nodesToLookAt.enqueue(child, shortestDistance);
    }

    map.tree.set(2, 8, START);
    map.tree.set(10, 8, END);

    map.drawMap();
    render();
});

document.getElementById("run").addEventListener("click", () => {
    const processedNodes = [];
    const nodesToLookAt = new PriorityQueue();
    nodesToLookAt.enqueue({x:2, y: 8, parent: null}, distanceBetweenPoints(2, 8, 10, 8));

    while (nodesToLookAt.length() > 0) {
        const node = nodesToLookAt.dequeue();

        if (node.x === 10 && node.y === 8) {
            const path = [];
            let current = node;
            while (current !== null) {
                map.tree.set(current.x, current.y, PATH);
                path.push(current);
                current = current.parent;
            }
            break;
        }

        map.tree.set(node.x, node.y, COMPLETE);
        processedNodes.push(node);

        const children = [
            {x:node.x-1, y:node.y, parent: node},
            {x:node.x, y:node.y-1, parent: node},
            {x:node.x+1, y:node.y, parent: node},
            {x:node.x, y:node.y+1, parent: node},
        ].filter((element) => {
            return (element.x >= 0 && element.x < 400/25 && element.y >= 0 && element.y < 400/25);
        }).filter((element) => {
            let found = false;

            const value = map.tree.get(element.x, element.y);
            if (value === WALL) {
                return false;
            }

            for (const processed of processedNodes) {
                if (processed.x === element.x && processed.y === element.y) {
                    found = true;
                    break;
                }
            }

            if (found ){
                return false;
            }

            found = nodesToLookAt.contains((node) => {
                return node.x === element.x && node.y === element.y;
            });
            return !found;
        });

        //console.log(children);

        for (const child of children) {
            map.tree.set(child.x, child.y, LOOK_AT);

            const distance = distanceBetweenPoints(child.x, child.y, 10, 8);
            nodesToLookAt.enqueue(child, distance);
        }
    }

    map.tree.set(2, 8, START);
    map.tree.set(10, 8, END);

    map.drawMap();
    render();
});