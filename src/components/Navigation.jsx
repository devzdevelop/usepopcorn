import {useState } from 'react'

import Logo from './Logo'
import Search from './Search'
import Results from './Results'

export default function Navigation ({movies}) {
  const [query, setQuery] = useState("");
  
  return (
    <>
      <nav className="nav-bar">
        <Logo />
        <Search query={query} setQuery={setQuery}/>
        <Results movies={movies}/>
      </nav>
    </>
  );
}