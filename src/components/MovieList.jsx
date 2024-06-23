import React from 'react'

import Movie from './Movie'

export default function MovieList({movies}) {
  return (
    <ul className="list">
    {movies?.map((movie) => (
      <Movie movie={movie} key={movie.imdbID}>
        <p>
          <span>📅</span>
          <span>{movie.Year}</span>
        </p>
      </Movie>
    
    ))}
  </ul>
  )
}
