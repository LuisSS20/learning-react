import { socket } from "../socket"

export const ChallengePlayer = ({sockeid}) => {

    const text = sockeid
    const rivalPlayerId = sockeid

    const onSendChallenge = () => {
        if(rivalPlayerId)
        {
            socket.emit("challenge player", {
                toPlayer: rivalPlayerId,
            });
        }
    }

    return (
        <section className='challenge-player'> 
            <p className='player-name'>{text}</p>
            <button onClick={onSendChallenge}>Challenge</button>
        </section>
    )
}

export default ChallengePlayer