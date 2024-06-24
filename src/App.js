import { useState } from "react";

import Navigation from './components/Navigation'
import Main from './components/Main'
import NumResults from './components/NumResults'
import Search from './components/Search'
import ListBox from './components/ListBox'
import WatchedBox from './components/WatchedBox'
import MovieList from './components/MovieList';
import {tempMovieData, tempWatchedData} from './data/movieData'

export default function App() {
  // eslint-disable-next-line
  const [movies, setMovies] = useState(tempMovieData);
  // eslint-disable-next-line
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <Navigation movies={movies}>
        <Search />
        <NumResults movies={movies}/>
      </Navigation>
      <Main>
        <ListBox>
            <MovieList movies={movies}/>
        </ListBox>
        <WatchedBox watched={watched} />
      </Main>
    </>
  );
}