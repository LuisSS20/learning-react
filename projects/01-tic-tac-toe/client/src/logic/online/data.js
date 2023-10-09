export const createJSONToSend = (sourceSocketId, board, turn, gameState, winner) => {

    const data = {
        sourceSocketId: sourceSocketId,
        board: board,
        turn: turn,
        gameState: gameState,
        winner: winner
    }

    return JSON.stringify(data)
}
