export const ConnectionStatus = ({isConnected}) => {

    return (
        <p><strong>Online:</strong> {isConnected ? "Connected" : "Disconnected"}</p>
    )
}

export default ConnectionStatus