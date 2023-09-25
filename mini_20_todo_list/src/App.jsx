import React, { useState, useEffect } from 'react';

import Controls from './componets/Controls';

import styles from './styles.module.css';
import Item from './componets/Item';

export default function App() {
	const [itemList, setItemList] = useState([]);

	return (<div className={styles.appRoot}>
		<div style={{
			display: 'flex',
			justifyContent: 'center',
		}}>
			<Controls onAddItem={(newItem) => {
				setItemList([
					...itemList,
					newItem,
				]);
			}}/>
		</div>
		<div>
			{itemList.map((item, index) => {
				return <Item item={item} index={index} onRemove={() => {
					const itemListCopy = [...itemList];
					itemListCopy.splice(index, 1);
					setItemList(itemListCopy);
				}} />
			})}
		</div>
	</div>);
}