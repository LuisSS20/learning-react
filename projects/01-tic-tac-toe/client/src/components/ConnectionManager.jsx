import { socket } from '../socket';

export const ConnectionManager = () => {

    const connect = () => {
        socket.connect()
    }

    const disconnect = () => {
        socket.disconnect()
    }

    return (
        <>
            <button onClick={connect}>Go Online Mode</button>
            <button onClick={disconnect}>Exit Online Mode</button>
        </>
    )

}

export default ConnectionManager