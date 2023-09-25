import { useState } from 'react';

import styles from '../styles.module.css';

export default function Controls({ onAddItem }) {
	const [currentItem, setCurrentItem] = useState('');
    const [currentPriority, setCurrentPriority] = useState('high');

    return (
        <div className={styles.controlsHolder}>
			<div>
				<label style={{
					marginRight: 10,
				}}>New Item</label>
				<input value={currentItem} onChange={(event) => {
					const newItem = event.target.value;
					setCurrentItem(newItem);
				}} type="text" />
			</div>
			<select value={currentPriority} onChange={(event) => {
                setCurrentPriority(event.target.value);
            }}>
				<option value="high">High Priority</option>
				<option value="med">Medium Priority</option>
				<option value="low">Low Priority</option>
			</select>
			<button onClick={() => {
				onAddItem({
                    text: currentItem,
                    priority: currentPriority,
                });
				setCurrentItem("");
			}}>Add</button>
		</div>
    );
}