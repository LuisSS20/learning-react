export const ChallengeDialog = ({playerName}) => {

    return (
        <div className="footer-dialog">
            <h2>{playerName} has challenge you!</h2>
            <div>
                <button>Accept</button>
                <button>Decline</button>
            </div>
        </div>
    )
}

export default ChallengeDialog