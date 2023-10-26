import { socket } from '../socket';

export const DisconnectionButton = ({text = 'Exit Online Mode', handleDisconnection, onlineMatch}) => {

    const disconnect = () => {
        if(onlineMatch && onlineMatch.isPlaying)
        {
            socket.emit('user disconnect from match', onlineMatch.rivalPlayer)
        }
        socket.disconnect()
    }

    return (
        <>
            <button onClick={disconnect}>{text}</button>
        </>
    )

}

export default DisconnectionButton