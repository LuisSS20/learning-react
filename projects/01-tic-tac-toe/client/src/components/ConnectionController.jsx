import { useState, useEffect } from 'react';
import { socket } from '../socket';
import { ConnectionStatus } from './ConnectionStatus'
import ConnectionButton from './ConnectionButton';
import DesconnectionButton from './DesconnectionButton';
import { PlayerList } from './PlayerList';
import ChallengeDialog from './ChallengeDialog'
import HeaderDialog from './HeaderDialog'

export const ConnectionController = ({isConnected, setIsConnected, isSearchingPlayers, setSearchingPlayers}) => {

  const [playersList, setPlayersList] = useState([])
  const [challengeRequestList, setChallengeRequestList] = useState([])

  useEffect(() => {
    function onConnect() {
      setIsConnected(true)
      console.log('my socket id: ' + socket.id)
    }

    function onDisconnect() {
      setIsConnected(false)
    }

    function onGettingPlayers(players) {
      setPlayersList(() => {
        return players.filter((player) => socket.id !== player.playerId)
      })
    }

    function onGettingNewUserConnected(user) {
      console.log('old array before user connected: ', playersList)
      setPlayersList((prevPlayersList) => {
        const newPlayersList = [...prevPlayersList, user];
        console.log('new array after user connected: ', newPlayersList);
        return newPlayersList;
      });
    }

    function onDisconnectUser(user) {
      setPlayersList((prevPlayersList) => {
        return prevPlayersList.filter((player) => user.playerId !== player.playerId)
      })
    }

    function onReceiveChallenge({fromPlayer}) {
      setChallengeRequestList((prevChallengeList) => {
        return [...prevChallengeList, fromPlayer]
      })
    }

    function onChallengeResponse({fromPlayer, response}) {
      if(response)
      {
        // TODO
      }
      else {
        
      }
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('players', onGettingPlayers)
    socket.on('user connected', onGettingNewUserConnected)
    socket.on('user disconnected', onDisconnectUser)
    socket.on('receive challenge', onReceiveChallenge)
    socket.on('challenge call', onChallengeResponse)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('players', onGettingPlayers)
      socket.off('user connected', onGettingNewUserConnected)
      socket.off('user disconnected', onDisconnectUser)
      socket.off('receive challenge', onReceiveChallenge)
      socket.off('challenge call', onChallengeResponse)

      socket.disconnect()
    };
  }, [])

  useEffect(() => {
    console.log(playersList)
  }, [playersList])

  return (

    <div>
        {isSearchingPlayers && <PlayerList {...{isSearchingPlayers, setSearchingPlayers, playersList, setChallengeRequestList}}/>}
        <ConnectionStatus isConnected={isConnected}/>
        <ConnectionButton setSearchingPlayers={setSearchingPlayers}/>
        <DesconnectionButton setSearchingPlayers={setSearchingPlayers}/>
        {
          challengeRequestList && challengeRequestList.map(
            (rivalPlayerId) => {
              return (
                <ChallengeDialog socket={socket} playerId={rivalPlayerId} setChallengeRequestList={setChallengeRequestList} key={rivalPlayerId}/>
              );
            }
          ) 
        }
        {/* <HeaderDialog text={"Esto es una Prueba!!"}/> */}
    </div>
  )
}

export default ConnectionController