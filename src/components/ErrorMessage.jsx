import "../index.css"

function ErrorMessage({message}) {
    if(message === "Search for a movie") {
        return (
            <p className="error">
                <span>🔍 </span>
                {message}
            </p>
        )
    } else {
        return (
            <p className="error">
                <span>⛔ </span>
                {message}
            </p>
        )
    }
}

export default ErrorMessage
