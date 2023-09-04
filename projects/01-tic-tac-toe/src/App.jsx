import { useState } from 'react';
import './App.css'
import { useEffect } from 'react';

const TURNS = {
  X: "x",
  O: 'o'
}

const GAMESTATE = {
  inprocess: "INPROCESS",
  draw: "DRAW",
  win: "WIN"
}

const Square = ({children, isSelected, updatedBoard, index}) =>
{
  const className = `square ${isSelected ? 'is-selected' : ''}`
  
  const handleClick = () => {
    updatedBoard(index)
  }

  return (
    <div className={className} onClick={handleClick}>
        {children}
    </div>
  )
}


function App() {

  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(GAMESTATE.inprocess);

  const checkWinner = (board) =>{
    return checkHorizontalWinner(board) || checkVerticalWinner(board)
           || checkDiagonalWinner(board) || null
  }

  const checkHorizontalWinner = (board) => {

    const sqrtValue = Math.sqrt(board.length)
    for (var i = 0; i < board.length; i+= sqrtValue)
    {
      const horizontalLine = board.slice(i, i + sqrtValue);
      
      // Get winner if all elements are equals
      if (horizontalLine.every((value) => value === horizontalLine[0])) {
        return horizontalLine[0]
      }
    }
    // No winner
    return null
  };

  const checkVerticalWinner = (board) => {

    const sqrtValue = Math.sqrt(board.length)
    for (var i = 0; i < sqrtValue; i++ )
    {
      const verticalLine = [];

      for (let j = i; j < board.length; j += sqrtValue) {
        verticalLine.push(board[j])
      }
      
      // Get winner if all elements are equals
      if (verticalLine.every((value) => value === verticalLine[0])) {
        return verticalLine[0]
      }
    }
    // No winner
    return null
  };

  const checkDiagonalWinner = (board) => {

    const sqrtValue = Math.sqrt(board.length)
    const diagonalLine = [board[0]];
    const reversedDiagonalLine = [board[sqrtValue-1]];

    for (var i = 1; i < sqrtValue; i++ )
    {
      diagonalLine.push(board[i + sqrtValue*i])
      reversedDiagonalLine.push(board[sqrtValue - 1 + (sqrtValue-1)*i])
    }
    console.log(diagonalLine)
    if (diagonalLine.every((value) => value === diagonalLine[0])) {
      return diagonalLine[0]
    }
    console.log(reversedDiagonalLine)
    if (reversedDiagonalLine.every((value) => value === reversedDiagonalLine[0])) {
      return reversedDiagonalLine[0]
    }
    // No winner
    return null
  };

  const updatedBoard = (index) =>{
    //To avoid overwrite square value
    if(board[index] != null || winner != GAMESTATE.inprocess) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // Check winner
    const newWinner = checkWinner(newBoard)
    if(newWinner)
    {
      setWinner(newWinner);
    }

    // Change turn
    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <section className='game'>
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updatedBoard={updatedBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn == TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
    </main>
  ) 
}

export default App
