export const ChallengePlayer = ({sockeid}) => {

    const text = sockeid

    return (
        <section className='challenge-player'> 
            <p className='player-name'>{text}</p>
            <button>Challenge</button>
        </section>
    )
}

export default ChallengePlayer