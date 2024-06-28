import Movie from "./Movie";
import {useState, useEffect} from 'react'
const KEY = "d39fd186"

function MovieDetails({selectedId, onCloseMovie}) {
    const [movie, setMovie] = useState({});
    useEffect(() => {
        const fetchMovieDetails =  async() => {
            const response = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
            const data = await response.json();
            console.log(data);
            setMovie(data);
            console.log(data.Title)
        }
        fetchMovieDetails()
    }, [selectedId]);

    return (
        <div className="details">
            {/* {selectedId} */}
            <button className="btn-back" onClick={onCloseMovie}>&larr;</button>
            <Movie movie={movie} key={movie.imdbID}>

            </Movie>
        </div>
    )
}

export default MovieDetails;
