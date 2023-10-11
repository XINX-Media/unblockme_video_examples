import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import albums from '../data/songs.json';

export default function Album() {
    const { albumId } = useParams();
    const navigate = useNavigate();

    const album = albums.find((album) => album.id == albumId);

    useEffect(() => {
        if (!album) {
            navigate("/bad-album");
        }
    }, [album]);

    if (!album) {
        return null;
    }

    return <div>
        <h2>Album</h2>
        <h3>Name: {album.name}</h3>
        <h3>Songs</h3>
        {album.songs.map((song) => {
            return <div key={`song_${song.id}`}>
                <Link to={`/album/${albumId}/song/${song.id}`}>{song.name}</Link>
            </div>
        })}
    </div>
}