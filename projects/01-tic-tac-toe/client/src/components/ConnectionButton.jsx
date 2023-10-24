import { useEffect, useState } from 'react';
import { socket } from '../socket';

export const ConnectionButton = ({text='Go Online Mode', setSearchingPlayers, username, setUsername}) => {

    const [isOpen, setIsOpen] = useState(false)

    const accept = () => {
        setIsOpen(true)
    }

    const connect = () => {
        socket.connect()
        setSearchingPlayers(true)
    }

    const closeDialog = () => {
        setIsOpen(false)
    }

    const handleInputChange = (event) => {
        setUsername(event.target.value);
    };

    useEffect( () => {
        if(username)
        {
            setIsOpen(false)
            connect()
        }
    }, [isOpen])

    return (
        <>
            <button onClick={accept}>{text}</button>
            {isOpen && 
                <div className='winner'>
                    <div className='username-dialog'>
                        <p><strong>Introduce your username</strong></p>
                        <input type="text" value={username} onChange={handleInputChange} />
                        <section className='flex-items-centered'>
                        <button onClick={closeDialog}>Accept</button>
                        <button onClick={closeDialog}>Cancel</button>
                        </section>
                    </div>
                </div>
            }
        </>
    )

}

export default ConnectionButton