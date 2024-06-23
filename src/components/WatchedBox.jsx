import {useState} from 'react'

import WatchedMoviesList from './WatchedMoviesList'
import WatchedMoviesSummary from './WatchedMoviesSummary'

export default function SavedMovies ({watched}) {
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
              <WatchedMoviesSummary watched={watched} />
              <WatchedMoviesList watched={watched}/>
            </>
          )}
        </div>
  );
}