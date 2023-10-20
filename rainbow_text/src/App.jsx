import React from 'react';

import styles from './styles.module.css';

import RainbowText from './components/RainbowText';

export default function App() {
	const text = "Welcome to Rainbow Text This is some additional text";
	const startColor = "000";
	const endColor = "fff";

	return (<div className={styles.appRoot}>
		<RainbowText text={text} startColor={startColor} endColor={endColor} speed={50} />
	</div>);
}