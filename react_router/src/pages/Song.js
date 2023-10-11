import React from 'react';
import { useParams } from 'react-router-dom';

import albums from '../data/songs.json';

export default function Song() {
    const { albumId, songId } = useParams();

    const album = albums.find((album) => album.id == albumId);
    const song = album.songs.find((song) => song.id == songId);

    return <div>
        <h2>Song</h2>
        <h3>Title: {song.name}</h3>
        <a href={song.link}>Link to song on YouTube</a>
    </div>
}