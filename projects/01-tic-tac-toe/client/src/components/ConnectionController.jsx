import { useState, useEffect } from 'react';
import { socket } from '../socket';
import { ConnectionStatus } from './ConnectionStatus'
import ConnectionButton from './ConnectionButton';
import DesconnectionButton from './DesconnectionButton';


export const ConnectionController = ({isConnected, setIsConnected, isSearchingPlayers, setSearchingPlayers}) => {

  useEffect(() => {
    function onConnect() {
      setIsConnected(true)
    }

    function onDisconnect() {
      setIsConnected(false)
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.disconnect()
    };
  }, [])

  return (
    <div>
        <ConnectionStatus isConnected={isConnected}/>
        <ConnectionButton setSearchingPlayers={setSearchingPlayers}/>
        <DesconnectionButton setSearchingPlayers={setSearchingPlayers}/>
    </div>
  )
}

export default ConnectionController