export const saveStorage = (board, turn, gameState, winner) => {
    window.localStorage.setItem('board', JSON.stringify(board))
    window.localStorage.setItem('winner', JSON.stringify(winner))
    window.localStorage.setItem('gameState', JSON.stringify(gameState))
    window.localStorage.setItem('turn', JSON.stringify(turn))
}

export const clearStorage = () => {
    window.localStorage.removeItem('winner')
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
    window.localStorage.removeItem('gameState')
}