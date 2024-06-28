import Loader from "./Loader";
import Movie from "./Movie";
import StarRating from './StarRating';

import {useState, useEffect} from 'react'

const KEY = "d39fd186"

function MovieDetails({selectedId, onCloseMovie}) {
    const [movie, setMovie] = useState({});
    const [isLoding, setIsLoading] = useState(false);
    useEffect(() => {
        const getMovieDetails =  async() => {
            try {
                setIsLoading(true);
            const response = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
            const data = await response.json();
            console.log(data);
            setMovie(data);
            console.log(data.Title)
            } catch(error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
        getMovieDetails()
    }, [selectedId]);

    return (
        <div className="details">
            {isLoding ? <Loader />
            : <>
            <header>
            <button className="btn-back" onClick={onCloseMovie}>&larr;</button>
            <img src={movie.Poster} alt={movie.Title} />
            <div className="details-overview">
                <h3>{movie.Title}</h3>
                <p>{movie.Released}</p>
                <p>{movie.Genre}</p>
                <p><span>⭐</span>{movie.imdbRating} IMDb rating</p>
            </div>
        </header>
        <section>
            <div className="rating">
             <StarRating key={movie.imdbID} maxRating={10} size={24}/>
            </div>
            <p><em>{movie.Plot}</em></p>
            <p>Directed by {movie.Director}</p>
        </section>
        </> }
            
        </div>
    )
}

export default MovieDetails;
