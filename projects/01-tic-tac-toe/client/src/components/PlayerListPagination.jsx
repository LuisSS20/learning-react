
export const PlayerListPagination = ({currentPage, playersCount, playersPerPage, paginate, previousPage, nextPage}) => {

    const pageNumbers = []
    const elementsPagination = []
    const numButtonsNeeded = Math.ceil(playersCount / playersPerPage)

    for (let i = 1; i <= numButtonsNeeded; i++) {
        pageNumbers.push(i)
    }

    for (let i = currentPage; i < currentPage + playersPerPage || i < currentPage; i++) {
        console.log(currentPage, i)
        const className = `page-button ${currentPage == i ? 'is-selected' : ''}`

        elementsPagination.push(
            <button onClick={() => paginate(i)} key={i} className={className}>{i}</button>
        )
        
    }


    return (
        <section className="pagination">
            <button onClick={() => previousPage()} className="next-previous-button">
                {"\u00AB"}
            </button>
            {elementsPagination}
            <button onClick={() => nextPage()} className="next-previous-button">
                {"\u00BB"}
            </button>
        </section>
    )
}

export default PlayerListPagination