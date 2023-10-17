import { useEffect, useState } from 'react'

export const Alert = ({alert, setAlertsList}) => {

    const [show, setShow] = useState(false)
    let showTimeOut, hideTimeOut, deleteTimeOut;

    const deleteAlert = () => {
        setAlertsList((prevAlertList) => {
            return prevAlertList.filter((alert_a) => alert_a !== alert)
        })
    }

    useEffect(() => {

        showTimeOut = setTimeout(() => {
            setShow(true)
          }, 50)

        hideTimeOut = setTimeout(() => {
            setShow(false)
            deleteTimeOut = setTimeout(() => {
                setShow(false)
                deleteAlert()
              }, 1000)
          }, 10000)

          return () => {
            clearTimeout(showTimeOut);
            clearTimeout(hideTimeOut);
            clearTimeout(deleteTimeOut);
          };
    }, [])
    
    return (
        <li className={`${show ? 'show' : ''}`}>
            <button onClick={deleteAlert} className="close-button">X</button>
            <p className="header-text">{alert.text}</p>
        </li>
    );
}

export default Alert