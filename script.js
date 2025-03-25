function gameboard() {
    gameboard = []
    for (let i = 0; i < 3; i++) {
        gameboard[i] = [];
        for (let j = 0; j < 3; j++) {
            gameboard[i][j] = 0;
        }
    }
}