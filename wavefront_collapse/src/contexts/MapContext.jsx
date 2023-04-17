import React, { useRef, useState } from "react";

import useRender from '../utils/useRender';

const MapContext = React.createContext();
export default MapContext;

export const EMPTY = 0;
export const MOUNTAIN = 1;
export const FOREST = 2;
export const BEACH = 3;
export const OCEAN = 4;
export const GRASSLAND = 5;

export function MapProvider({ children }) {
    const mapRef = useRef(null);
    const [isSetup, setIsSetup] = useState(false);
    const render = useRender();

    const value = {
        map: mapRef.current,
        isSetup,
        initMap: (width, height) => {
            const newMap = [];
            for (let row=0;row<height;row++) {
                const rowData = [];
                for (let col=0;col<width;col++) {
                    rowData.push(EMPTY);
                }
                newMap.push(rowData);
            }
            mapRef.current = newMap,
            setIsSetup(true);
            render();
        },
        setCell: (x, y, value) => {
            const newMap = [...mapRef.current];
            const newRow = [...newMap[y]];
            newRow[x] = value;
            newMap[y] = newRow;
            mapRef.current = newMap;
            render();
        },
        getCell: (x, y) => {
            if (x < 0 || y < 0) {
                return EMPTY;
            }

            if (y > mapRef.current.length-1 || x > mapRef.current[0].length-1) {
                return EMPTY;
            }
            return mapRef.current[y][x];
        },
        getWidth: () => {
            if (mapRef.current.length === 0) {
                return 0;
            }
            return mapRef.current[0].length-1;
        },
        getHeight: () => {
            return mapRef.current.length;
        }
    };

    return <MapContext.Provider value={value}>
        {children}
    </MapContext.Provider>;
}