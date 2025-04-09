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
        gameboard[x][y] = value;
        console.log(gameboard);
    }

    return {reset, update};
})();

gameboard.reset();

function player() {
    let player = "X";
    const change = () => {
        player = player === "X" ? "O" : "X";
        console.log(player);
    }

    const playerTurn = (x, y, player) => {
        gameboard.update(x, y, player);
    }

    return {player, change, playerTurn};
};

const player1 = player();
const player2 = player();


// probably need variables for each player to store turn locations?
// so far i changed the iife to a normal function for 2 instances of player