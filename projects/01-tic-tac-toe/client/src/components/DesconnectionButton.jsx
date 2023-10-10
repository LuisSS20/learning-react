import { socket } from '../socket';

export const DesconnectionButton = ({text = 'Exit Online Mode', setSearchingPlayers}) => {

    const disconnect = () => {
        socket.disconnect()
        setSearchingPlayers(false)
    }

    return (
        <>
            <button onClick={disconnect}>{text}</button>
        </>
    )

}

export default DesconnectionButton