import { useState } from "react";

import Navigation from './components/Navigation'
import MoviesList from './components/MoviesList'
import SavedMovies from './components/SavedMovies'

import {tempMovieData, tempWatchedData} from './data/movieData'

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <>
      <Navigation movies={movies} />
      
      <main className="main">
        <MoviesList movies={movies}/>
        <SavedMovies watched={watched} avgImdbRating={avgImdbRating} avgUserRating= {avgUserRating} avgRuntime={avgRuntime}/>
      </main>
    </>
  );
}