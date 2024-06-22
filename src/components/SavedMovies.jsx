import {useState} from 'react'

import SavedMoviesList from './SavedMoviesList'
import WatchedMoviesSummary from './WatchedMoviesSummary'

export default function SavedMovies ({watched, avgImdbRating, avgUserRating, avgRuntime}) {
  const [isOpen2, setIsOpen2] = useState(true);
  
  return (
    <div className="box">
          <button
            className="btn-toggle"
            onClick={() => setIsOpen2((open) => !open)}
          >
            {isOpen2 ? "–" : "+"}
          </button>
          {isOpen2 && (
            <>
              <WatchedMoviesSummary watched={watched, avgImdbRating, avgUserRating, avgRuntime}/>
              <SavedMoviesList watched={watched}/>
            </>
          )}
        </div>
  );
}