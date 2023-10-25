
export const onSendChallenge = (socket, rivalPlayerId) => {
    if(rivalPlayerId)
    {
        socket.emit("challenge player", {
            toPlayer: rivalPlayerId,
        });
    }
}