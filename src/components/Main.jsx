import React from 'react'
import { useState } from "react";

import ListBox from './ListBox'
import WatchedBox from './WatchedBox'
import {tempMovieData, tempWatchedData} from '../data/movieData'


export default function Main() {
    // eslint-disable-next-line
    const [movies, setMovies] = useState(tempMovieData);
    // eslint-disable-next-line
    const [watched, setWatched] = useState(tempWatchedData);
    
    return (
    <main className="main">
        <ListBox movies={movies}/>
        <WatchedBox watched={watched} />
    </main>
    )
}
