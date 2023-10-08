import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import { Square } from './components/Square.jsx'
import { TURNS, GAMESTATE } from './constants.js'
import { checkWinner, checkEndGame } from './logic/board.js'
import { WinnerModal } from './components/WinnerModal'
import { clearStorage, saveStorage } from './logic/storage'
import { ConnectionController } from './components/ConnectionController'
import {socket} from './socket'
 

function App() {

  const [isConnected, setIsConnected] = useState(socket.connected)

  const [board, setBoard] = useState( () =>{
    const boardFromLocalStorage = window.localStorage.getItem('board') 
    return boardFromLocalStorage ? JSON.parse(boardFromLocalStorage) : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() =>{
    const turnFromLocalStorage = window.localStorage.getItem('turn') 
    return turnFromLocalStorage ? JSON.parse(turnFromLocalStorage) : TURNS.X
  })
  const [gameState, setGameState] = useState(() => {
    const gameStateFromLocalStorage = window.localStorage.getItem('gameState') 
    return gameStateFromLocalStorage ? JSON.parse(gameStateFromLocalStorage) : GAMESTATE.inprocess
  })
  const [winner, setWinner] = useState(() => {
    const winnerFromLocalStorage = window.localStorage.getItem('winner') 
    return winnerFromLocalStorage ? JSON.parse(winnerFromLocalStorage) : null
  })

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setGameState(GAMESTATE.inprocess)
    setTurn(TURNS.X)
    setWinner(null)
    //Clean local storage
    clearStorage();
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

    // Save match 
    saveStorage(newBoard, newTurn, gameState, newWinner)
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
      
      <div>
        <button onClick={resetGame}>Start again</button>
        <ConnectionController isConnected={isConnected} setIsConnected={setIsConnected}/>
      </div>

    </main>
  ) 
}

export default App
