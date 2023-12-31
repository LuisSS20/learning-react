import { useState, useEffect } from 'react';
import { socket } from '../socket';
import { ConnectionStatus } from './ConnectionStatus'
import ConnectionButton from './ConnectionButton';
import DisconnectionButton from './DisconnectionButton';
import { PlayerList } from './PlayerList';
import ChallengeDialog from './ChallengeDialog'
import AlertList from './AlertList'
import { Alert, OnlineMatch } from '../logic/online/objects';
import { TURNS } from '../constants';
import { removeDuplicates } from '../logic/utils';

export const ConnectionController = ({username, setUsername, isConnected, setIsConnected, isSearchingPlayers, setSearchingPlayers, onlineMatch, setOnlineMatch, setBoard, setGameState, setTurn, setWinner, resetGame, winnerConffetti}) => {

  const [playersList, setPlayersList] = useState([])
  const [challengeRequestList, setChallengeRequestList] = useState([])
  const [alertsList, setAlertsList] = useState([])

  const handleDisconnection = () => {
    setIsConnected(false)
    setSearchingPlayers(false)
    console.log(onlineMatch, 'online match')
    setOnlineMatch(new OnlineMatch(false, '', null))
    setUsername('')

    resetGame()
    socket.disconnect()
  }

  const addNewAlert = (text) => {
    setAlertsList((prevAlertsList) => {
      return prevAlertsList.concat(new Alert(prevAlertsList.length, text))
    })
  }

  useEffect(() => {
    function onConnect() {
      setIsConnected(true)
      console.log('my socket id: ' + socket.id)
    }

    function onDisconnect() {
      handleDisconnection()
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

    function onReceiveChallenge(rival) {
      setChallengeRequestList((prevChallengeList) => {
        const newArray = [...prevChallengeList, rival];
        return removeDuplicates(newArray)
      })
    }

    function onChallengeResponse({fromPlayer, fromUsername, response}) {
      
      if(response)
      {
        addNewAlert(fromUsername + ' has accepted the challenge!')
      }
      else {
        addNewAlert(fromUsername + ' has refused the challenge!')
      }
    }

    function onUserDisconnectFromMatch({fromPlayer, fromUsername}) {
      addNewAlert(fromUsername + ' has left the game!')
      onDisconnect()
    }

    function onStartMatch({rivalPlayer, rivalUsername, firstTurn}){
        setOnlineMatch(new OnlineMatch(true, rivalPlayer, rivalUsername, firstTurn ? TURNS.X : TURNS.O))
        resetGame()
        addNewAlert(`New game against ${rivalUsername} has started!`)
    }

    function onUpdateMatch(matchData) {
      console.log(matchData)
      const {board, gameState, turn, winner} = matchData
      setBoard(board)
      setGameState(gameState)
      setTurn(turn)
      setWinner(winner)
      // Check if new winner, then show confetti 
      // winnerConffetti(winner)
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('players', onGettingPlayers)
    socket.on('user connected', onGettingNewUserConnected)
    socket.on('user disconnected', onDisconnectUser)
    socket.on('receive challenge', onReceiveChallenge)
    socket.on('challenge response', onChallengeResponse)
    socket.on('start match', onStartMatch)
    socket.on('update match', onUpdateMatch)
    socket.on('user disconnect from match', onUserDisconnectFromMatch)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('players', onGettingPlayers)
      socket.off('user connected', onGettingNewUserConnected)
      socket.off('user disconnected', onDisconnectUser)
      socket.off('receive challenge', onReceiveChallenge)
      socket.off('challenge response', onChallengeResponse)
      socket.off('start match', onStartMatch)
      socket.off('update match', onUpdateMatch)
      socket.off('user disconnect from match', onUserDisconnectFromMatch)

      socket.disconnect()
    };
  }, [])

  useEffect(() => {
    console.log(playersList)
  }, [playersList])

  return (

    <div>
        {!onlineMatch.isPlaying && isSearchingPlayers && <PlayerList {...{isSearchingPlayers, setSearchingPlayers, playersList, setChallengeRequestList, handleDisconnection}}/>}
        <ConnectionStatus isConnected={isConnected}/>
        {isConnected && <p><strong>Username:</strong> {username}</p>}
        <section className='flex-items-centered'>
          { !onlineMatch.isPlaying && <ConnectionButton {...{setSearchingPlayers, username, setUsername}}/>}
          <DisconnectionButton onlineMatch={onlineMatch} handleDisconnection={handleDisconnection}/>
        </section>
        {
          challengeRequestList && challengeRequestList.map(
            (rivalPlayer) => {
              return (
                <ChallengeDialog username={rivalPlayer.fromUsername} setOnlineMatch={setOnlineMatch} socket={socket} playerId={rivalPlayer.fromPlayer} setChallengeRequestList={setChallengeRequestList} key={rivalPlayer.fromPlayer}/>
              );
            }
          ) 
        }
        {alertsList &&  <AlertList alertsList={alertsList} setAlertsList={setAlertsList}/>}
    </div>
  )
}

export default ConnectionController