import { useKey } from "../hooks/useKey";
import Loader from "./Loader";
import StarRating from './StarRating';

import {useState, useEffect, useRef} from 'react'

const KEY = "d39fd186"

function MovieDetails({selectedId, onCloseMovie, onAddWatched, onWatched}) {
    const [movie, setMovie] = useState({});
    const [isLoding, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState(0);
    const isWatched = onWatched.map(movie => movie.imdbID).includes(selectedId);
    const watchedUserRating = onWatched.find(movie => movie.imdbID === selectedId)?.userRating;

    const countRef = useRef(0);
    
    useEffect(() => {
        if (userRating) countRef.current = countRef.current + 1;
    },[userRating]);

    const handleAdd = () => {
        const newWatchedMovie = {
            imdbRating: Number(movie.imdbRating),
            imdbID: selectedId,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster,
            runtime: Number(movie.Runtime.split(" ").at(0)),
            userRating: userRating, 
            countRatingDecisions: countRef.current,
        }
        const movieExists = onWatched.some((prev) => prev.imdbID === movie.imdbID);

        !movieExists && onAddWatched(newWatchedMovie);
        movieExists && alert(`Movie '${newWatchedMovie.title}' is already added to watched list.`)
        
        onCloseMovie();
    }

    // listenting to a keypress
    useKey('Escape', onCloseMovie);

    // changing page title based on the selected movie
    useEffect(() => {
        if(!movie.Title) return
        document.title = `Movie | ${movie.Title}`;                                                                                                                                                                                                                                                                                  
                
        return () => document.title = "usePopcorn";
    },[movie.Title])

    // fetching movies details using the id of the selected movie
    useEffect(() => {
        const getMovieDetails =  async() => {
            try {
            setIsLoading(true);
            const response = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
            const data = await response.json();
            setMovie(data);
            
            } catch(error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }

        getMovieDetails()
    }, [selectedId]);

    document.title = movie.Title !== undefined && `Movie | ${movie.Title}`;

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
                {!isWatched 
                ? <>
                    <StarRating key={movie.imdbID} maxRating={10} size={24} onSetRating={setUserRating}/>
                    <button className="btn-add" onClick={handleAdd}>Add to list</button>
                </>
                : <p>You rated this movie {watchedUserRating} <span>⭐</span></p>}
             
            </div>
            <p><em>{movie.Plot}</em></p>
            <p>Directed by {movie.Director}</p>
        </section>
        </> }
            
        </div>
    )
}

export default MovieDetails;
