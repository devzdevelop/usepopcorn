import React from 'react'

import Movie from './Movie'

export default function MovieList({movies, handleSelectMovie}) {
  return (
    <ul className="list list-movies">
    {movies?.map((movie) => (
      <Movie movie={movie} key={movie.imdbID} onSelectMovie={handleSelectMovie}>
        <p>
          <span>📅</span>
          <span>{movie.Year}</span>
        </p>
      </Movie>
    
    ))}
  </ul>
  )
}
