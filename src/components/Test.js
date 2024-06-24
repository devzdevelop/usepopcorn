import { useState } from "react"
import StarRating from "./StarRating"

function Test() {
    const [movieRating, setMovieRating] = useState(0);
    return (
        <div>
            <StarRating color="green" size="20" onSetRating={setMovieRating}/>
            <p>The movie was rated {movieRating} stars.</p>
        </div>
    )
}

export default Test
