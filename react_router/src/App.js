import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import styles from './styles.css';

import Header from './components/Header';
import Home from './pages/Home';
import Album from './pages/Album';
import Song from './pages/Song';
import FourOhFour from './pages/404';

export default function App() {
	return (<div className={styles.appRoot}>
		<Router>
			<Header />
			<div>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/album/:albumId" element={<Album />} />
					<Route path="/album/:albumId/song/:songId" element={<Song />} />
					<Route path="*" element={<FourOhFour />} />
				</Routes>
			</div>
		</Router>
	</div>);
}