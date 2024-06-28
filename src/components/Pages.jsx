function Pages({page, currentPage, setCurrentPage}) {
    const containerStyle = {
        display: 'flex',
        flexWrap: 'wrap', 
        gap: '.7rem', 
        padding: '1rem',
        width: 'fit-content',
        backgroundColor: '#2b3035',
        borderRadius: '0.5rem',
        margin: '0 auto'
    }

    const activeButtonStyle = {
        border: '1px solid transparent',
        backgroundColor: 'transparent',
        borderRadius: '0.5rem',
        // cursor: 'pointer',
        color: '#6741d9',
        fontSize: '1.6rem'
    }

    const buttonStyle = {
        border: '1px solid transparent',
        backgroundColor: 'transparent',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        color: '#fff',
        fontSize: '1.6rem'
    }

    return (
        <div style={{padding: '4rem 0'}}>
            {/* <h3>Pages:</h3> */}
            <div style={containerStyle}>
                
                {
                Array.from({ length: page }, (_, i) => (
                    currentPage === i+1
                    ? <button key={i} style={activeButtonStyle} onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                    : <button key={i} style={buttonStyle} onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                ))
                }
            </div>
        </div>
    )
}

export default Pages
