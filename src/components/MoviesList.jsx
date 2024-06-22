import {useState} from 'react'

import Movie from './Movie'

export default function MoviesList ({movies}) {
  const [isOpen1, setIsOpen1] = useState(true);
  
  return (
    <div className="box">
          <button
            className="btn-toggle"
            onClick={() => setIsOpen1((open) => !open)}
          >
            {isOpen1 ? "–" : "+"}
          </button>
          {isOpen1 && (
            <ul className="list">
              {movies?.map((movie) => (
                <Movie movie={movie}>
                  <p>
                    <span>📅</span>
                    <span>{movie.Year}</span>
                  </p>
                </Movie>
              ))}
            </ul>
          )}
        </div>
  );
}
// 🗓