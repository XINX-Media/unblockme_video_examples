import React from 'react';
import { Link } from 'react-router-dom';

import albums from '../data/songs.json';

export default function Home() {
    return <div>
        <h2>Albums</h2>
        {albums.map((album) => {
            return <div key={`album_${album.id}`}>
                <Link to={`/album/${album.id}`}>{album.name}</Link>
            </div>;
        })}
    </div>;
}