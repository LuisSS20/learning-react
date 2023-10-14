import { useState, useEffect } from 'react';
import { socket } from '../socket';
import { ConnectionStatus } from './ConnectionStatus'
import ConnectionButton from './ConnectionButton';
import DesconnectionButton from './DesconnectionButton';
import { PlayerList } from './PlayerList';

export const ConnectionController = ({isConnected, setIsConnected, isSearchingPlayers, setSearchingPlayers}) => {

  const [playersList, setPlayersList] = useState([])

  useEffect(() => {
    function onConnect() {
      setIsConnected(true)
      console.log('my socket id: ' + socket.id)
    }

    function onDisconnect() {
      setIsConnected(false)
    }

    function onGettingPlayers(players) {
      setPlayersList(players)
      console.log(players)
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
        return prevPlayersList.filter((user_a) => user.playerId !== user_a.playerId)
      })
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('players', onGettingPlayers)
    socket.on('user connected', onGettingNewUserConnected)
    socket.on('user disconnected', onDisconnectUser)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('players', onGettingPlayers)
      socket.off('user connected', onGettingNewUserConnected)
      socket.off('user disconnected', onDisconnectUser)

      socket.disconnect()
    };
  }, [])

  useEffect(() => {
    console.log(playersList)
  }, [playersList])

  return (

    <div>
        {isSearchingPlayers && <PlayerList {...{isSearchingPlayers, setSearchingPlayers, playersList}}/>}
        <ConnectionStatus isConnected={isConnected}/>
        <ConnectionButton setSearchingPlayers={setSearchingPlayers}/>
        <DesconnectionButton setSearchingPlayers={setSearchingPlayers}/>
    </div>
  )
}

export default ConnectionController