import { useState, useEffect } from 'react';
import { socket } from '../socket';
import { ConnectionStatus } from './ConnectionStatus'
import ConnectionButton from './ConnectionButton';
import DesconnectionButton from './DesconnectionButton';
import { PlayerList } from './PlayerList';
import ChallengeDialog from './ChallengeDialog'
import AlertList from './AlertList'
import { Alert, OnlineMatch } from '../logic/online/objects';
import { TURNS } from '../constants';

export const ConnectionController = ({isConnected, setIsConnected, isSearchingPlayers, setSearchingPlayers, setOnlineMatch}) => {

  const [playersList, setPlayersList] = useState([])
  const [challengeRequestList, setChallengeRequestList] = useState([])
  const [alertsList, setAlertsList] = useState([])

  useEffect(() => {
    function onConnect() {
      setIsConnected(true)
      console.log('my socket id: ' + socket.id)
    }

    function onDisconnect() {
      setIsConnected(false)
      setAlertsList([])
      setPlayersList([])
      setChallengeRequestList([])
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
        if(!prevChallengeList.includes(fromPlayer))
          return [...prevChallengeList, fromPlayer]
        else
          return prevChallengeList
      })
    }

    function onChallengeResponse({fromPlayer, response}) {
      
      if(response)
      {
        setAlertsList((prevAlertsList) => {
          return prevAlertsList.concat(new Alert(prevAlertsList.length, fromPlayer + ' has accepted the challenge!'))
        })
        
      }
      else {
        setAlertsList((prevAlertsList) => {
          return prevAlertsList.concat(new Alert(prevAlertsList.length, fromPlayer + ' has refused the challenge!'))
        })
      }
    }

    function onStartMatch({rivalPlayer, firstTurn}){
        // Set OnlineMatch
        setOnlineMatch(new OnlineMatch(true, rivalPlayer, firstTurn ? TURNS.X : TURNS.O))
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('players', onGettingPlayers)
    socket.on('user connected', onGettingNewUserConnected)
    socket.on('user disconnected', onDisconnectUser)
    socket.on('receive challenge', onReceiveChallenge)
    socket.on('challenge response', onChallengeResponse)
    socket.on('start match', onStartMatch)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('players', onGettingPlayers)
      socket.off('user connected', onGettingNewUserConnected)
      socket.off('user disconnected', onDisconnectUser)
      socket.off('receive challenge', onReceiveChallenge)
      socket.off('challenge response', onChallengeResponse)
      socket.off('start match', onStartMatch)

      socket.disconnect()
    };
  }, [])

  useEffect(() => {
    console.log(playersList)
  }, [playersList])

  return (

    <div>
        {isSearchingPlayers && <PlayerList {...{isSearchingPlayers, setSearchingPlayers, playersList, setChallengeRequestList}}/>}
        <section className='flex-items-centered'>
        <ConnectionButton setSearchingPlayers={setSearchingPlayers}/>
        <ConnectionStatus isConnected={isConnected}/>
        </section>
        {/* <DesconnectionButton setSearchingPlayers={setSearchingPlayers}/> */}
        {
          challengeRequestList && challengeRequestList.map(
            (rivalPlayerId) => {
              return (
                <ChallengeDialog setOnlineMatch={setOnlineMatch} socket={socket} playerId={rivalPlayerId} setChallengeRequestList={setChallengeRequestList} key={rivalPlayerId}/>
              );
            }
          ) 
        }
        {alertsList &&  <AlertList alertsList={alertsList} setAlertsList={setAlertsList}/>}
    </div>
  )
}

export default ConnectionController