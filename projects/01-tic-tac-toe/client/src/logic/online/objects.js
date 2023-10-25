export function Alert(position, text) {
    this.position = position;
    this.text = text;
}

export function OnlineMatch(isPlaying, rivalPlayer, rivalUsername, myTurn) {
    this.isPlaying = isPlaying;
    this.rivalPlayer = rivalPlayer;
    this.rivalUsername = rivalUsername;
    this.myTurn = myTurn;
}
