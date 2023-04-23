class TreeNode {
    constructor(value, x, y, width, height) {
        this.value = value;
        this.children = [];
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

function getChildIndexForCoordinates(current, x, y) {
    let belowHalfwayY = y < (current.y + Math.floor(current.height/2));
    let belowHalfwayX = x < (current.x + Math.floor(current.width/2));

    if (current.height === 1) {
        belowHalfwayY = true;
    }
    if (current.width === 1) {
        belowHalfwayX = true;
    }

    //console.log(`(${current.x}, ${current.y}) size is ${current.width}, ${current.height}`);
    //console.log(`we are looking for (${x}, ${y}). Below halfway Y? ${belowHalfwayY}. Below halfway x? ${belowHalfwayX}`);

    let childIndex = -1;

    if (belowHalfwayX && belowHalfwayY) {
        childIndex = 0;
    } else if (belowHalfwayX && !belowHalfwayY) {
        if (current.width > 1) {
            childIndex = 2;
        } else {
            // in this case we only have 2 elements and 2 needs to map to 1
            childIndex = 1;
        }
    } else if (!belowHalfwayX && belowHalfwayY) {
        childIndex = 1;
    } else if (!belowHalfwayX && !belowHalfwayY) {
        childIndex = 3;
    }

    return childIndex;
}

function createNecessaryChildren(current) {
    // create children if necessary
    if (current.children.length === 0) {
        // top left child
        current.children.push(new TreeNode(
            current.value,
            current.x,
            current.y,
            Math.floor(current.width/2),
            Math.floor(current.height/2),
        ));
        if (current.width > 1) {
            // top right child
            current.children.push(new TreeNode(
                current.value,
                current.x + Math.floor(current.width/2),
                current.y,
                Math.ceil(current.width/2),
                Math.floor(current.height/2),
            ));
        }
        if (current.height > 1) {
            // bottom left child
            current.children.push(new TreeNode(
                current.value,
                current.x,
                current.y + Math.floor(current.height/2),
                Math.floor(current.width/2),
                Math.ceil(current.height/2),
            ));
        }
        if (current.height > 1 && current.width > 1) {
            // bottom right child
            current.children.push(new TreeNode(
                current.value,
                current.x + Math.floor(current.width/2),
                current.y + Math.floor(current.height/2),
                Math.ceil(current.width/2),
                Math.ceil(current.height/2),
            ));
        }
    }
}

function collapseParent(node) {
    if (node.children.length === 0) {
        return true;
    }

    for (const child of node.children) {
        const result = collapseParent(child);

        if (result === false) {
            return false;
        }
    }

    // if we get here, all children are collapsed
    let value = node.children[0].value;
    for (const child of node.children) {
        if (value !== child.value) {
            // not all values are the same, cannot collapse
            return false;
        }
    }

    // if we get here, all children have the same value and we
    // can collapse

    node.children = [];
    node.value = value;

    return true;
}

class Tree {
    constructor(value, x, y, width, height) {
        this.root = new TreeNode(value, x, y, width, height);
    }

    set(x, y, value) {
        let current = this.root;

        const nodeTree = [current];

        while (true) {
            // if we get here, we've found our pixel, set it and quit
            if (x === current.x && y === current.y && current.width <= 1 && current.height <= 1) {
                current.value = value;
                break;
            }

            const childIndex = getChildIndexForCoordinates(current, x, y);
            createNecessaryChildren(current);

            current = current.children[childIndex];
            nodeTree.push(current);
        }

        // collapse the tree as necessary to improve storage
        nodeTree.reverse();
        for (const node of nodeTree) {
            const result = collapseParent(node);

            if (!result) {
                break;
            }
        }
    }

    getJson() {
        const getJsonHelper = (node) => {
            const data = {
                x: node.x,
                y: node.y,
                width: node.width,
                height: node.height,
                value: node.value,
                children: node.children.map((child) => {
                    return getJsonHelper(child);
                }),
            }

            return data;
        }

        return getJsonHelper(this.root);
    }

    print() {
        const jsonObject = this.getJson();
        console.log(JSON.stringify(jsonObject, null, 4));
    }

    get(x, y) {
        let current = this.root;

        while (true) {
            // if we get here, we've found our pixel, return its value
            if (x === current.x && y === current.y && current.width <= 1 && current.height <= 1) {
                return current.value;
            }

            if (current.children.length === 0) {
                return current.value;
            }

            const childIndex = getChildIndexForCoordinates(current, x, y);

            current = current.children[childIndex];
        }
    }
}

export default Tree;