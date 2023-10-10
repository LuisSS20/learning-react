import Spinner from "./Spinner"
import {DesconnectionButton} from './DesconnectionButton'

export function PlayerList ({isSearchingPlayers, setSearchingPlayers}) {

  if(!isSearchingPlayers) return null
  const text = 'Waiting for players...'

  return (
    <section className='winner'>
      <div className='text'>
        <h2>{text}</h2>
         {
          <Spinner/>
         }
        
        <footer>
          <DesconnectionButton text="Exit" setSearchingPlayers={setSearchingPlayers}/>
        </footer>
      </div>
    </section>
  )     
}
   