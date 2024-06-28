import { useState, useEffect } from "react";

import './index.css'
import {tempWatchedData} from './data/movieData'

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
  const [watched, setWatched] = useState(tempWatchedData);
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

  const handleCloseMovie = () => {
    setSeletectedId(null);
  }

  // fetching movie data from OMDb API
  useEffect(() => {
    const getMovies = async () =>{
      try {
        setIsLoading(true);
        setError(false);

        if(!query) {
          setPageList(undefined)
        }

        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}&page=${currentPage}`)

        const data = await res.json();

        // handing some errors when fetching
        console.log(data);
        console.log(data.Error)

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
          console.log('printed false')
          return
        } else {
          console.log('printed true')
          setMovies(data.Search)
          console.log('Data: ', query)
        }

        // calculates the total number of pages based on the amount of fetch results
        setPageList( Math.floor((data.totalResults / data.Search.length)));

        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        console.log("error: ", error);
      } finally {
        setIsLoading(false);
      }
    }
    getMovies();
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
              {!isLoading && !error && <MovieList movies={movies} handleSelectMovie={handleSelectMovie}/>}
          </Box>
          <Box2 watched={watched}>
            {
              selectedId 
              ? <MovieDetails selectedId={selectedId} onCloseMovie={handleCloseMovie} />
              : <>
                  <WatchedMoviesSummary watched={watched} />
                  <WatchedMoviesList watched={watched}/>
                </>
            }
          </Box2>
        </div>
        
      </Main>
      {!isLoading && !error && pageList > 0 && <Pages page={pageList} currentPage={currentPage} setCurrentPage={setCurrentPage}/>}
      
    </div>
  );
}