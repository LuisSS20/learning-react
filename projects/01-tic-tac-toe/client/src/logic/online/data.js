export const createJSONToSend = (fromPlayer, toPlayer, board, turn, gameState, winner) => {

    const data = {
        fromPlayer: fromPlayer,
        toPlayer: toPlayer,
        board: board,
        turn: turn,
        gameState: gameState,
        winner: winner
    }

    // return JSON.stringify(data)
    return data;
}
