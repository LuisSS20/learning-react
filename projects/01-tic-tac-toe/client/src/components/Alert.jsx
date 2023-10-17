import { useEffect } from 'react'

export const Alert = ({alert, setAlertsList}) => {

    const deleteAlert = () => {
        setAlertsList((prevAlertList) => {
            return prevAlertList.filter((alert_a) => alert_a !== alert)
        })
    }

    useEffect(() => {
        const timeId = setTimeout(() => {
            deleteAlert()
          }, 5000)
    }, [])

    return (
        <li>
            <button onClick={deleteAlert} className="close-button">X</button>
            <p className="header-text">{alert.text}</p>
        </li>
    );
}

export default Alert