import Movie from './Movie'

export default function WatchedMoviesList ({watched}) {
  
  return (
    <ul className="list">
      {watched.map((movie) => (
        <Movie movie={movie}>
          <p>
            <span>⭐️</span>
            <span>{movie.imdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{movie.userRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{movie.runtime} min</span>
          </p>         
        </Movie>
        
      ))}
    </ul>
  );
}