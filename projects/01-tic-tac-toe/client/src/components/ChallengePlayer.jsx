import { socket } from "../socket"
import { onSendChallenge } from "../logic/online/socketLogic"

export const ChallengePlayer = ({username, sockeid}) => {

    const text = sockeid
    const rivalPlayerId = sockeid
    const rivalUsername = username

    return (
        <section className='challenge-player'> 
            <p className='player-name'>{rivalUsername}</p>
            <button onClick={() => { onSendChallenge(socket, rivalPlayerId, rivalUsername) }}>Challenge</button>
        </section>
    )
}

export default ChallengePlayer