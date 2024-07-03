import { useState, useEffect } from "react";
const KEY = "d39fd186"
export function useMovies(query, currentPage, setPageList, pageList) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    // fetching movie data from OMDb API
  useEffect(() => {
    // callback?.();
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

    getMovies();

    return () => controller.abort();

  },[query, pageList, currentPage, setPageList])

  return {movies, isLoading, error}
}