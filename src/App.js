import { useState} from "react";

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
import { useMovies } from "./hooks/useMovies";
import { useLocalStorageState } from "./data/useLocalStorageState";


export default function App() {
  
  const [pageList, setPageList] = useState(1);
  const [currentPage, setCurrentPage] = useState(pageList ? 1 : undefined);
  const [selectedId, setSeletectedId] = useState(null);
  const [query, setQuery] = useState("");
  
  // custom hooks
  const {movies, isLoading, error} = useMovies(query, currentPage, setPageList, pageList); 
  const [watched, setWatched] = useLocalStorageState([], "watched");


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