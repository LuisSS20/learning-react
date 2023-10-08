export const ConnectionStatus = ({isConnected}) => {

    return (
        <p>Online state: {isConnected ? "Connected" : "Disconnected"}</p>
    )
}

export default ConnectionStatus