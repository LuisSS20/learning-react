import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import { Square } from './components/Square.jsx'
import { TURNS, GAMESTATE } from './constants.js'
import { checkWinner, checkEndGame } from './logic/board.js'
import { WinnerModal } from './components/WinnerModal'

function App() {

  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [gameState, setGameState] = useState(GAMESTATE.inprocess)
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setGameState(GAMESTATE.inprocess)
    setTurn(TURNS.X)
    setWinner(null)
  }

  const updatedBoard = (index) =>{
    //To avoid overwrite square value
    if(board[index] != null || gameState != GAMESTATE.inprocess) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // Check winner
    const newWinner = checkWinner(newBoard)
    if(newWinner)
    {
      confetti()
      setWinner(newWinner)
      setGameState(GAMESTATE.win)
    }
    // Check if it is a draw
    if(checkEndGame(newBoard))
    {
      setGameState(GAMESTATE.draw)
    }

    // Change turn if match status
    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <section className='game'>
        {
          board.map((value, index) => {
            return (
              <Square
                key={index}
                index={index}
                updatedBoard={updatedBoard}
              >
                {value}
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

      <WinnerModal resetGame={resetGame} winner={winner} gameState={gameState}/>
      
      <button onClick={resetGame}>Start again</button>
    </main>
  ) 
}

export default App
