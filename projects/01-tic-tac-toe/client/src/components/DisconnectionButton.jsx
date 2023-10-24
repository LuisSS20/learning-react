import { socket } from '../socket';

export const DisconnectionButton = ({text = 'Exit Online Mode', handleDisconnection}) => {

    const disconnect = () => {
        handleDisconnection()
    }

    return (
        <>
            <button onClick={disconnect}>{text}</button>
        </>
    )

}

export default DisconnectionButton