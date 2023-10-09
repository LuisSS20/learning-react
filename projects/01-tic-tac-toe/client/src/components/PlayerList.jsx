import Spinner from "./Spinner"
import { Square } from "./Square"

export function PlayerList ({isSearchingPlayers, setSearchingPlayers}) {

  if(!isSearchingPlayers) return null
  const text = 'Waiting for players...'

  return (
    <section className='winner'>
      <div className='text'>
        <h2>{text}</h2>
         {
          // gameState != GAMESTATE.draw &&
          <Spinnner/>
         }
        
        <footer>
          <button>Exit</button>
        </footer>
      </div>
    </section>
  )     
}
   