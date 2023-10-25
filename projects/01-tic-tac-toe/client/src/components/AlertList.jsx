import {Alert} from './Alert'

export const AlertList = ({alertsList, setAlertsList}) => {


    return (
        
        alertsList && <ul className="alert-list">
        {
            alertsList.map(
                (alert) => {
                    return <Alert key={alert.position} {...{alert, setAlertsList}}/>
                }
            ) 
        }
        </ul>  
    )
}

export default AlertList