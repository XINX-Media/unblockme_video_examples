import { useContext, useState } from "react";

import MapContext, { EMPTY } from "../contexts/MapContext";
import { randomIntFromInterval } from './random';

export default function useCollapse(RULES, DEFAULT_TILE) {
    const [currentX, setCurrentX] = useState(0);
    const [currentY, setCurrentY] = useState(0);
    const [finished, setFinished] = useState(false);
    const { getCell, setCell, getWidth, getHeight } = useContext(MapContext);

    const moveToNextCell = () => {
        if (currentX + 1 > getWidth()) {
            setCurrentX(0);
            if (currentY + 1 > getHeight()-1) {
                setFinished(true);
            } else {
                setCurrentY(currentY + 1);
            }
        } else {
            setCurrentX(currentX + 1);
        }
    }

    const takeStep = () => {
        if (finished) {
            return;
        }
        const currentCell = getCell(currentX, currentY);
        if (currentCell !== EMPTY) {
            moveToNextCell();
            return;
        }

        const neighbors = [];
        neighbors.push(getCell(currentX-1, currentY));
        neighbors.push(getCell(currentX, currentY-1));
        neighbors.push(getCell(currentX+1, currentY));
        neighbors.push(getCell(currentX, currentY+1));

        const firstNeighborAllowed = RULES[neighbors[0]];
        let allowedCellTypes = [...firstNeighborAllowed];
        for (const neighbor of neighbors) {
            const newNeighborAllowed = RULES[neighbor];
            allowedCellTypes = allowedCellTypes.filter((x) => {
                return newNeighborAllowed.includes(x);
            });
        }
        const allowedCellTypesList = Array.from(allowedCellTypes);

        const randomCellIndex = randomIntFromInterval(0, allowedCellTypesList.length-1);
        const randomCellType = allowedCellTypesList[randomCellIndex];
        setCell(currentX, currentY, randomCellType || DEFAULT_TILE);

        moveToNextCell();
    }

    const generateMap = () => {
        for (let row = 0; row < getHeight(); row ++) {
            for (let col = 0; col <= getWidth(); col ++) {
                setCell(col, row, EMPTY);
            }
        }

        for (let row = 0; row < getHeight(); row ++) {
            for (let col = 0; col <= getWidth(); col ++) {
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
                for (const neighbor of neighbors) {
                    const newNeighborAllowed = RULES[neighbor];
                    allowedCellTypes = allowedCellTypes.filter((x) => {
                        return newNeighborAllowed.includes(x);
                    });
                }
                const allowedCellTypesList = Array.from(allowedCellTypes);

                const randomCellIndex = randomIntFromInterval(0, allowedCellTypesList.length-1);
                const randomCellType = allowedCellTypesList[randomCellIndex];
                setCell(currentX, currentY, randomCellType || DEFAULT_TILE);
            }
        }
    }

    return {
        takeStep,
        generateMap,
    };
}
