export function Alert(position, text) {
    this.position = position;
    this.text = text;
}

export function OnlineMatch(isPlaying, rivalPlayer, myTurn) {
    this.isPlaying = isPlaying;
    this.rivalPlayer = rivalPlayer;
    this.myTurn = myTurn;
}
