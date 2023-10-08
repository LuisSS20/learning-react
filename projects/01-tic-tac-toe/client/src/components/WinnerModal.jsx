import { GAMESTATE } from "../constants"
import { Square } from "./Square"

export function WinnerModal ({winner, resetGame, gameState}) {

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
          <button onClick={resetGame}>Start again</button>
        </footer>
      </div>
    </section>
  )     
}
   