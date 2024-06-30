import { useState, useEffect } from "react";

import './index.css'

import Navigation from './components/Navigation'
import Main from './components/Main'
import NumResults from './components/NumResults'
import Search from './components/Search'
import Box from './components/Box'
import Box2 from './components/Box2'
import WatchedMoviesList from './components/WatchedMoviesList'
import WatchedMoviesSummary from './components/WatchedMoviesSummary'
import MovieList from './components/MovieList';
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import Pages from "./components/Pages";
import MovieDetails from "./components/MovieDetails";

const KEY = "d39fd186"
export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [pageList, setPageList] = useState(1);
  const [currentPage, setCurrentPage] = useState(pageList ? 1 : undefined);
  const [query, setQuery] = useState("");
  const [selectedId, setSeletectedId] = useState(null);

  // select movie handle
  const handleSelectMovie = (id) => {
    setSeletectedId(selectedId => id === selectedId ? null : id);
  }

  // handle close movie details
  const handleCloseMovie = () => {
    setSeletectedId(null);
  }

  // adding watched movies
  const handleAddWatched = (movie) => {  
    setWatched((prev) => {  
      return [...prev, movie]
    })   
  }

  // handle the remove movies in the watchedList
  const handleDeleteWatched = (id) => {
    setWatched(watch => watched.filter( movie => movie.imdbID !== id))
  }

  // fetching movie data from OMDb API
  useEffect(() => {
    const controller = new AbortController();

    const getMovies = async () =>{
      try {
        setIsLoading(true);
        setError(false);

        if(!query) {
          setPageList(undefined)
        }

        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}&page=${currentPage}`, 
        { signal : controller.signal })

        const data = await res.json();

        // handing some errors when fetching
        // console.log(data);
        // console.log('Fetch Movie List Error: ', data.Error || 'No error.');

        if(data.Error === "Too many results." || data.Error === "Movie not found!" || data.Error === 'Incorrect IMDb ID.') {
          if(data.Error === "Movie not found!") {
            throw new Error(data.Error);
          }
          if(data.Error === "Too many results.") {
            throw new Error("No movies found. Please type in more characters for the movie you are searching for.");
          }
          if(data.Error === 'Incorrect IMDb ID.') {
            throw new Error('Search for a movie')
          }
          return
        } else {
          setMovies(data.Search)
          setError("");
          // console.log('Search Query: ', query)
        }

        // calculates the total number of pages based on the amount of fetch results
        setPageList( Math.floor((data.totalResults / data.Search.length)));

        setIsLoading(false);
      } catch (error) {
        console.log("error: ", error);
        if(error.name !== "AbortError") {
          setError(error.message);
        }
        
      } finally {
        setIsLoading(false);
      }
    }

    handleCloseMovie();
    
    getMovies();

    return () => controller.abort();

  },[query, pageList, currentPage])

  return (
    <div>
      <Navigation movies={movies}>
        <Search query={query} setQuery={setQuery}/>
        <NumResults movies={movies}/>
      </Navigation>
      <Main>
        <div className="main">
          <Box>
              <div style={{height: '40px'}}></div>
              {isLoading && <Loader />}
              {!isLoading && error && <ErrorMessage message={error} />}
              {!isLoading && !error && <MovieList movies={movies} handleSelectMovie={handleSelectMovie} />}
          </Box>
          <Box2>
            {
              selectedId 
              ? <MovieDetails 
              selectedId={selectedId} 
              onCloseMovie={handleCloseMovie} 
              onAddWatched={handleAddWatched} 
              onWatched={watched} />
              : <>
                  <WatchedMoviesSummary watched={watched} />
                  <WatchedMoviesList watched={watched} onDeleteWatched={handleDeleteWatched}/>
                </>
            }
          </Box2>
        </div>
        
      </Main>
      {!isLoading && !error && pageList > 0 && <Pages page={pageList} currentPage={currentPage} setCurrentPage={setCurrentPage}/>}
      
    </div>
  );
}