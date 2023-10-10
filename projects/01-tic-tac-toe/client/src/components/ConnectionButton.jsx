import { socket } from '../socket';

export const ConnectionButton = ({text='Go Online Mode', setSearchingPlayers}) => {

    const connect = () => {
        socket.connect()
        setSearchingPlayers(true)
    }

    return (
        <>
            <button onClick={connect}>{text}</button>
        </>
    )

}

export default ConnectionButton