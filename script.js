function gameboard() {
    let gameboard = []

    const resetGameboard = () => {
        for (let i = 0; i < 3; i++) {
            gameboard[i] = [];
            for (let j = 0; j < 3; j++) {
                gameboard[i][j] = "";
            }
        }
        console.log(gameboard);
    }
    

    const updateGameboard = (x, y, value) => {
        gameboard[x][y] = value;
        console.log(gameboard);
    }

    return {resetGameboard, updateGameboard};
}

let test = gameboard();
test.resetGameboard();
test.updateGameboard(2,2,"X");