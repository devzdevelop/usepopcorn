import WatchedMovie from './WatchedMovie'

export default function WatchedMoviesList ({watched, onDeleteWatched}) {
  // console.log("Watched: ", watched)
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} onDeleteWatched={onDeleteWatched} >
          <p>
            <span>⭐️</span>
            <span>{isNaN(movie.imdbRating) ? "NaN" : movie.imdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{movie.userRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span>{movie.runtime} min</span>
          </p>         
        </WatchedMovie>
        
      ))}
    </ul>
  );
}