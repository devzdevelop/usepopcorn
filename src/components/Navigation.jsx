import {useState } from 'react'

import Logo from './Logo'
import Search from './Search'
import NumResults from './NumResults'

export default function Navigation () {
  const [query, setQuery] = useState("");
  
  return (
    <>
      <nav className="nav-bar">
        <Logo />
        <Search query={query} setQuery={setQuery}/>
        <NumResults />
      </nav>
    </>
  );
}