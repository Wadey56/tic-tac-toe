function gameboard() {
    let gameboard = []

    const reset = () => {
        for (let i = 0; i < 3; i++) {
            gameboard[i] = [];
            for (let j = 0; j < 3; j++) {
                gameboard[i][j] = "";
            }
        }
        console.log(gameboard);
    }
    

    const update = (x, y, value) => {
        gameboard[x][y] = value;
        console.log(gameboard);
    }

    return {reset, update};
}

let gameboard1 = gameboard();
gameboard1.reset();
gameboard1.update(2,2,"X");