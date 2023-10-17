import { useState, useEffect } from "react";

export const ChallengeDialog = ({socket, playerId, setChallengeRequestList}) => {

    const [show, setShow] = useState(false)
    let showTimeOut;

    useEffect(() => {

        showTimeOut = setTimeout(() => {
            setShow(true)
          }, 50)

          return () => {
            clearTimeout(showTimeOut);
          };
    }, [])

    const sendChallengeResponse = (accepted) => {
        if(accepted)
        {
            ;
        }
        else{
            setChallengeRequestList((prevChallengeList) => {
                console.log('Eliminate request from ', playerId)
                return prevChallengeList.filter( playerId => playerId !== playerId )
            })

        }

        socket.emit("challenge response", {
            toPlayer: playerId,
            response: accepted,
        });
    }

    return (
        <div className={`footer-dialog ${show ? 'show' : ''}`}>
            <h2>{playerId} has challenge you!</h2>
            <div>
                <button onClick={() => {sendChallengeResponse(true)}}>Accept</button>
                <button onClick={() => {sendChallengeResponse(false)}}>Decline</button>
            </div>
        </div>
    )
}

export default ChallengeDialog