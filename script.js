const gameboard = (() => {
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
        if (gameboard[x][y] !== "") {
            return console.log("Space already taken");
        } else {
            gameboard[x][y] = value;
            console.log(gameboard);
        }
        
    }

    const status = () => {
        console.log(gameboard);
        winningCombos = [
            [gameboard[0][0], gameboard[0][1], gameboard[0][2]],
            [gameboard[1][0], gameboard[1][1], gameboard[1][2]],
            [gameboard[2][0], gameboard[2][1], gameboard[2][2]],
            [gameboard[0][0], gameboard[1][0], gameboard[2][0]],
            [gameboard[0][1], gameboard[1][1], gameboard[2][1]],
            [gameboard[0][2], gameboard[1][2], gameboard[2][2]],
            [gameboard[0][0], gameboard[1][1], gameboard[2][2]],
        ]
    }

    return {reset, update, status};
})();

gameboard.reset();

function player() {
    let player = "X";

    const getPlayer = () => {
        return player;
    }

    const changePlayer = () => {
        return player = player === "X" ? "O" : "X";
    }

    const playerTurn = (x, y, player) => {
        gameboard.update(x, y, player);

    }

    return {
        getPlayer, 
        changePlayer, 
        playerTurn};
};

const player1 = player();
const player2 = player();


// probably need variables for each player to store turn locations?
// player2.changePlayer();
// player1.playerTurn(0, 0, player1.getPlayer());
// player2.playerTurn(0, 1, player2.getPlayer());
// player1.playerTurn(0, 2, player1.getPlayer());