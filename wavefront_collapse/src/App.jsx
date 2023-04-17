import React, { useState, useEffect, useContext } from 'react';

import styles from './styles.css?inline';

import MapContext, { MOUNTAIN, EMPTY, FOREST, BEACH, OCEAN, GRASSLAND } from './contexts/MapContext';
import useCollapse from './utils/useCollapse';
import TextInput from './components/TextInput';

const COLORS = {
	[EMPTY]: '#fff',
	[MOUNTAIN]: '#aaa',
	[FOREST]: '#0a0',
	[BEACH]: '#ff0',
	[OCEAN]: '#00f',
	[GRASSLAND]: '#0f0',
};

export default function App() {
	const { initMap, map, isSetup } = useContext(MapContext);
	const { takeStep, generateMap } = useCollapse({
		[EMPTY]: [MOUNTAIN, FOREST, BEACH, OCEAN],
		[MOUNTAIN]: [MOUNTAIN, FOREST],
		[FOREST]: [MOUNTAIN, FOREST, BEACH],
		[BEACH]: [BEACH, FOREST, OCEAN],
		[OCEAN]: [OCEAN, BEACH],
		[GRASSLAND]: [MOUNTAIN, FOREST, BEACH, OCEAN],
	}, GRASSLAND);
	const [width, setWidth] = useState(5);
	const [height, setHeight] = useState(5);

	useEffect(() => {
		initMap(parseInt(width), parseInt(height));
	}, [width, height]);

	useEffect(() => {
		if (isSetup) {
			//setCell(2, 2, MOUNTAIN);
			//setCell(2, 0, OCEAN);
		}
	}, [isSetup]);

	return (
		<div className={styles.appRoot}>
			{map && <table>
				<tbody>
					{map.map((row, index) => {
						return <tr key={`row_${index}`}>
							{row.map((cell, colIndex) => {
								return <td key={`col_${index}_${colIndex}`} style={{
									backgroundColor: COLORS[cell],
									width: 25,
									height: 25,
								}}></td>
							})}
						</tr>
					})}
				</tbody>
			</table>}
			<button onClick={takeStep}>
				Take Step
			</button>
			<button onClick={generateMap}>
				Generate
			</button>
			<div>
				<span>Width:</span>
				<TextInput onBlur={setWidth} value={width} />
			</div>
			<div>
				<span>Height:</span>
				<TextInput onBlur={setHeight} value={height} />
			</div>
		</div>
	);
}