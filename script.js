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
            status(value);
        }
    }

    const status = (value) => {
        winningStatus = false;

        winningCombos = [
            [gameboard[0][0], gameboard[0][1], gameboard[0][2]],
            [gameboard[1][0], gameboard[1][1], gameboard[1][2]],
            [gameboard[2][0], gameboard[2][1], gameboard[2][2]],
            [gameboard[0][0], gameboard[1][0], gameboard[2][0]],
            [gameboard[0][1], gameboard[1][1], gameboard[2][1]],
            [gameboard[0][2], gameboard[1][2], gameboard[2][2]],
            [gameboard[0][0], gameboard[1][1], gameboard[2][2]],
            [gameboard[0][2], gameboard[1][1], gameboard[2][0]]
        ]

        for (let i = 0; i < winningCombos.length; i++) {
            for (let j = 0; j < winningCombos[i].length; j++) {
                if (winningCombos[i][j] === value) {
                    winningStatus = true;
                } else {
                    winningStatus = false;
                    break;
                }
            }
            if (winningStatus === true) {
                game.play = false;
                return console.log("Player " + value + " wins!");
            }
        }
    }

    return {reset, update, status};
})();

gameboard.reset();

function player(value) {
    let player = value;

    const playerTurn = (x, y, player) => {
        if (game.play === false) {
            return;
        } 
        gameboard.update(x, y, player);
    }

    return {
        player, 
        playerTurn};
};

const player1 = player("X");
const player2 = player("O");

const game = (() => {
    const play = true;

    return {play};
})();


// player2.changePlayer();
// player1.playerTurn(0, 0, player1.getPlayer());
// player2.playerTurn(0, 1, player2.getPlayer());
// player1.playerTurn(0, 2, player1.getPlayer());