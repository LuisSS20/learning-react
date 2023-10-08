import { useState, useEffect } from 'react';
import { socket } from '../socket';
import { ConnectionManager } from './ConnectionManager'
import { ConnectionStatus } from './ConnectionStatus'


export const ConnectionController = ({isConnected, setIsConnected}) => {

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
        <ConnectionManager />
    </div>
  )
}

export default ConnectionController