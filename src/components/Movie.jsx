export default function Movie (props) {
  return (
    <li key={props.movie.imdbID} onClick={() => props.onSelectMovie(props.movie.imdbID)} >
      <img src={props.movie.Poster} alt={`${props.movie.Title} poster`} />
      <h3>{props.movie.Title}</h3>
      <div>
        {props.children}
      </div>
    </li>
  );
}