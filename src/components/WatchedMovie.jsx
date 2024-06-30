export default function WatchedMovie ({movie, onDeleteWatched, children}) {
  return (
    <li key={movie.imdbID}  >
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
      {children}
      <button className="btn-delete" onClick={() => onDeleteWatched(movie.imdbID)}>x</button>
      {/* <button className="btn-delete" onClick={() => onDeleteWatched(movie.imdbID)}>❌</button> */}
      </div>
    </li>
  );
}