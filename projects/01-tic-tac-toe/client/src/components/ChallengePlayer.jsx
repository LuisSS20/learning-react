import { socket } from "../socket"
import { onSendChallenge } from "../logic/online/socketLogic"

export const ChallengePlayer = ({sockeid}) => {

    const text = sockeid
    const rivalPlayerId = sockeid


    return (
        <section className='challenge-player'> 
            <p className='player-name'>{text}</p>
            <button onClick={() => { onSendChallenge(socket, rivalPlayerId) }}>Challenge</button>
        </section>
    )
}

export default ChallengePlayer