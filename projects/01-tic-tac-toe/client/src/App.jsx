import { useEffect, useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import { Square } from './components/Square.jsx'
import { TURNS, GAMESTATE } from './constants.js'
import { checkWinner, checkEndGame } from './logic/board.js'
import { WinnerModal } from './components/WinnerModal'
import { PlayerList } from './components/PlayerList'
import { clearStorage, saveStorage } from './logic/storage'
import { ConnectionController } from './components/ConnectionController'
import {socket} from './socket'
import { createJSONToSend } from './logic/online/data'
import { OnlineMatch } from './logic/online/objects'
import { PlayerTurn } from './components/PlayerTurn'


function App() {

  // Online variables
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [isSearchingPlayers, setSearchingPlayers] = useState(false)
  const [onlineMatch, setOnlineMatch] = useState(new OnlineMatch(false, ''))
  // END Online variables

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

  function winnerConffetti(newWinner) {
    if(newWinner && newWinner !== undefined)
    {
      confetti()
      setWinner(newWinner)
      setGameState(GAMESTATE.win)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setGameState(GAMESTATE.inprocess)
    setTurn(TURNS.X)
    setWinner(null)
    //Clean local storage
    clearStorage();

    // If it is connected then disconect
    disconnectSocket();
  }

  const disconnectSocket = () => {
    if(isConnected)
    {
      socket.disconnect()
    }
  }

  const updatedBoard = (index) =>{
    //To avoid overwrite square value
    if(  onlineMatch.myTurn && turn != onlineMatch.myTurn || (board[index] != null || gameState != GAMESTATE.inprocess)) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // Check if it is a draw
    if(checkEndGame(newBoard))
    {
      setGameState(GAMESTATE.draw)
    }

    // Change turn if match status
    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // Check if new winner
    const newWinner = checkWinner(newBoard)

    // Check if new winner confetti
    winnerConffetti(newWinner)

    // ONLINE PART
    const matchData = createJSONToSend(socket.id, onlineMatch.rivalPlayer, newBoard, newTurn ? newTurn : null, gameState ? gameState : null, newWinner ? newWinner : null)
    console.log(matchData)
    if (matchData) {
      socket.emit('update match', matchData);
    }

    // if new winner show dialog
    // checkWinner(newWinner)
    console.log(newWinner,'estoy')
    
    // Save match 
    saveStorage(newBoard, newTurn, gameState, newWinner)
  }

  return (
    <main>
      { onlineMatch.isPlaying &&
        <section className='container-online-info'>
          <h2>Online stats</h2>
          <div className='online-info'>
            <p>Your turn</p>
            <PlayerTurn onlineMatch={onlineMatch} />
            {onlineMatch.rivalPlayer && <div><p><strong>Rival player</strong></p><p>{onlineMatch.rivalPlayer}</p></div>}
          </div>
        </section>
      }
      
      <section className='board'>
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

        <WinnerModal {...{resetGame, winner, gameState, onlineMatch}} />
        <div>
          {!isConnected && <button onClick={resetGame}>Start again</button>}
          <ConnectionController {...{isConnected, setIsConnected, isSearchingPlayers, setSearchingPlayers, onlineMatch, setOnlineMatch, setBoard, setGameState, setTurn, setWinner, resetGame, winnerConffetti}} />
        </div>
      </section>
    </main>
  ) 
}

export default App
