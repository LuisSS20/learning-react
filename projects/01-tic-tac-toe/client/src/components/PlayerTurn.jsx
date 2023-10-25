import { TURNS } from "../constants";
import { Square } from "./Square"

export const PlayerTurn = ({onlineMatch}) => {

    if(!onlineMatch.isPlaying) return null

    const playerTurn = onlineMatch.myTurn;
        
    return (
        <section className='turn'>
            <Square isSelected={true}>
                {playerTurn === TURNS.X ? TURNS.X : TURNS.O}
            </Square>
        </section>
        
    )
}

export default PlayerTurn