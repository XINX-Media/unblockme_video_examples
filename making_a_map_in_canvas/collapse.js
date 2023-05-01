const EMPTY = 0;
const MOUNTAIN = 1;
const FOREST = 2;
const BEACH = 3;
const OCEAN = 4;
const GRASSLAND = 5;

const COLORS = {
	[EMPTY]: '#fff',
	[MOUNTAIN]: '#aaa',
	[FOREST]: '#0a0',
	[BEACH]: '#ff0',
	[OCEAN]: '#00f',
	[GRASSLAND]: '#0f0',
};

const RULES = {
    [EMPTY]: [MOUNTAIN, FOREST, BEACH, OCEAN],
    [MOUNTAIN]: [MOUNTAIN, FOREST],
    [FOREST]: [MOUNTAIN, FOREST, BEACH],
    [BEACH]: [BEACH, FOREST, OCEAN],
    [OCEAN]: [OCEAN, BEACH],
    [GRASSLAND]: [MOUNTAIN, FOREST, BEACH, OCEAN],
};

const PERCENTAGES = {
    [OCEAN]: {
        [OCEAN]: 90,
        [BEACH]: 10,
    },
    [FOREST]: {
        [MOUNTAIN]: 10,
        [FOREST]: 50,
        [BEACH]: 40,
    },
    [BEACH]: {
        [OCEAN]: 80,
        [BEACH]: 10,
        [FOREST]: 10,
    }
};

const DEFAULT_TILE = GRASSLAND

const generateMap = (width, height, getCell, setCell) => {
    for (let row = 0; row < height; row ++) {
        for (let col = 0; col < width; col ++) {
            setCell(col, row, EMPTY);
        }
    }

    for (let row = 0; row < height; row ++) {
        for (let col = 0; col <= width; col ++) {
            const currentX = col;
            const currentY = row;
            const currentCell = getCell(currentX, currentY);
            if (currentCell !== EMPTY) {
                continue;
            }

            const neighbors = [];
            neighbors.push(getCell(currentX-1, currentY));
            neighbors.push(getCell(currentX, currentY-1));
            neighbors.push(getCell(currentX+1, currentY));
            neighbors.push(getCell(currentX, currentY+1));

            const firstNeighborAllowed = RULES[neighbors[0]];
            let allowedCellTypes = [...firstNeighborAllowed];
            const percentages = [];
            for (const neighbor of neighbors) {
                const newNeighborAllowed = RULES[neighbor];
                allowedCellTypes = allowedCellTypes.filter((x) => {
                    return newNeighborAllowed.includes(x);
                });
                let neighborPercents = PERCENTAGES[neighbor];
                if (!neighborPercents) {
                    const totalItems = newNeighborAllowed.length;
                    const percentPerItem = 100/totalItems;
                    neighborPercents = {};
                    for (const item of newNeighborAllowed) {
                        neighborPercents[item] = percentPerItem;
                    }
                }
                percentages.push(neighborPercents);
            }
            const allowedCellTypesList = Array.from(allowedCellTypes);

            // now get count and total for percents
            const totalPerObject = {};
            const countPerObject = {};
            for (const neighborData of percentages) {
                for (const item in neighborData) {
                    if (!countPerObject[item]) {
                        countPerObject[item] = 0;
                        totalPerObject[item] = 0;
                    }
                    totalPerObject[item] += neighborData[item];
                    countPerObject[item] ++;
                }
            }
            // get percents
            const percentPerObject = {};
            let totalPercent = 0;
            for (const item in countPerObject) {
                if (!allowedCellTypes.includes(parseInt(item, 10))) {
                    continue;
                }
                const count = countPerObject[item];
                const total = totalPerObject[item];

                const percent = Math.round(total/count);
                totalPercent += percent;
                percentPerObject[item] = percent;
            }
            //console.log(totalPercent);

            const randomPercent = randomIntFromInterval(0, totalPercent);

            let currentPercent = 0;
            let randomCellIndex = -1;
            for (const item in percentPerObject) {
                const percent = percentPerObject[item];

                //console.log(item, currentPercent, currentPercent + percent, randomPercent);

                if (randomPercent >= currentPercent && randomPercent <= currentPercent + percent) {
                    randomCellIndex = allowedCellTypes.indexOf(parseInt(item, 10));
                    //console.log('got ', randomCellIndex, allowedCellTypes, parseInt(item, 10));
                    break;
                }
                currentPercent += percent;
            }

            const randomCellType = allowedCellTypesList[randomCellIndex];

            setCell(currentX, currentY, randomCellType || DEFAULT_TILE);
        }
    }
}