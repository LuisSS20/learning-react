import { GAMESTATE } from "../constants"
import { Square } from "./Square"
import { socket } from "../socket"
import { onSendChallenge } from "../logic/online/socketLogic"

export function WinnerModal ({winner, resetGame, gameState, onlineMatch}) {

  if(gameState == GAMESTATE.inprocess) return null
  const winnerText = winner != null ? 'Winner: ' : 'It is a draw!'

  return (
    <section className='winner'>
      <div className='text'>
        <h2>{winnerText}</h2>
         {
          gameState != GAMESTATE.draw &&
          <header className='win'>
            <h2>
              {winner && <Square>{winner}</Square>}
            </h2>
          </header>
         }
        
        <footer>
          {
            onlineMatch.isPlaying
            ?   
              <div>
                <button onClick={() => { onSendChallenge(socket, onlineMatch.rivalPlayer) }}>Challenge again</button>
                <button onClick={resetGame}>Exit Online</button>
              </div>
            : <button onClick={resetGame}>Start again</button>
          }
        </footer>
      </div>
    </section>
  )     
}
   