export const checkWinner = (board) =>{
    return checkVerticalWinner(board) || checkHorizontalWinner(board)
           || checkDiagonalWinner(board) || null
}

const checkHorizontalWinner = (board) => {

    const sqrtValue = Math.sqrt(board.length)
    for (var i = 0; i < board.length; i+= sqrtValue)
    {
      const horizontalLine = board.slice(i, i + sqrtValue)

      // Get winner if all elements are equals
      if (horizontalLine.every((value) => value === horizontalLine[0] && value != null)) {
        return horizontalLine[0]
      }
    }
    // No winner
    return null
}

const checkVerticalWinner = (board) => {

    const sqrtValue = Math.sqrt(board.length)
    for (var i = 0; i < sqrtValue; i++ )
    {
        const verticalLine = []

        for (let j = i; j < board.length; j += sqrtValue) {
        verticalLine.push(board[j])
        }
        
        // Get winner if all elements are equals
        if (verticalLine.every((value) => value === verticalLine[0] && value != null)) {
            return verticalLine[0]
        }
    }
    // No winner
    return null
}

const checkDiagonalWinner = (board) => {

    const sqrtValue = Math.sqrt(board.length)
    const diagonalLine = [board[0]]
    const reversedDiagonalLine = [board[sqrtValue-1]]

    for (var i = 1; i < sqrtValue; i++ )
    {
        diagonalLine.push(board[i + sqrtValue*i])
        reversedDiagonalLine.push(board[sqrtValue - 1 + (sqrtValue-1)*i])
    }
    if (diagonalLine.every((value) => value === diagonalLine[0])) {
        return diagonalLine[0]
    }
    if (reversedDiagonalLine.every((value) => value === reversedDiagonalLine[0])) {
        return reversedDiagonalLine[0]
    }
    // No winner
    return null
}

export const checkEndGame = (board) => {
    //Check if every position is occupied
    return board.every(element => element != null)
}