import React, { useState, useEffect, useRef } from 'react';

import styles from './styles.css?inline';

import range from './utils/range';
import Tree from './utils/Tree.mjs';
import useRender from './utils/useRender';

const WIDTH = 6;
const HEIGHT = 6;

const colorMap = {
	0: '#00f',
	1: '#0a0',
};

export default function App() {
	const treeRef = useRef(new Tree(0, 0, 0, WIDTH, HEIGHT));
	const render = useRender();

	const json = treeRef.current.getJson();

	return (<div className={styles.appRoot}>
		<table>
			<tbody>
				{range(0, HEIGHT).map((y) => {
					return <tr key={`row_${y}`}>
						{range(0, WIDTH).map((x) => {
							const value = treeRef.current.get(x, y);
							return <td
								style={{
									width: 10,
									height: 10,
									backgroundColor: colorMap[value],
								}}
								key={`col_${x}`}
								onClick={() => {
									const newValue = value === 1 ? 0 : 1;
									treeRef.current.set(x, y, newValue);
									render();
								}}
							></td>;
						})}
					</tr>;
				})}
			</tbody>
		</table>
		<div>
			<pre>{JSON.stringify(json, null, 4)}</pre>
		</div>
	</div>);
}