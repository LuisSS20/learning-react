import Spinner from "./Spinner"
import {DisconnectionButton} from './DisconnectionButton'
import ChallengePlayer from "./ChallengePlayer"
import { useState } from 'react';
import PlayerListPagination from "./PlayerListPagination";

export function PlayerList ({isSearchingPlayers, setSearchingPlayers, playersList, setChallengeRequestList, handleDisconnection}) {

  if(!isSearchingPlayers) return null
  const text = 'Looking for players...'

  const playersPerPage = 3
  const [currentPage, setCurrentPage] = useState(1)


  const indexOfLastPlayer = currentPage * playersPerPage
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage
  const currentPlayers = playersList ? playersList.slice(indexOfFirstPlayer, indexOfLastPlayer) : []

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const nextPage = () => {
    if (currentPage !== Math.ceil(playersList.length / playersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <section className='winner'>
    {
      <div className='text-player'>
        <h2>{text}</h2>
           <Spinner/>

           {currentPlayers && currentPlayers.map((player, index) => {
            if (player) {
              return (
                <ChallengePlayer username={player.username} sockeid={player.playerId} key={player.playerId}/>
              );
            }
            return null;
          })}

          {playersList.length > 0 && <PlayerListPagination currentPage={currentPage} paginate={paginate} playersCount={playersList.length} playersPerPage={playersPerPage} {...{previousPage, nextPage}}/>}
        
        <footer>
          <DisconnectionButton text="Exit" handleDisconnection={handleDisconnection}/>
        </footer>
      </div>
    }
    </section>
  )     
}
   