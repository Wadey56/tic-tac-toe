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

    return {reset, update};
})();

gameboard.reset();

function player() {
    let player = "X";

    const getPlayer = () => {
        return player;
    }

    const change = () => {
        return player = player === "X" ? "O" : "X";
    }

    const playerTurn = (x, y, player) => {
        gameboard.update(x, y, player);

    }

    return {
        getPlayer, 
        change, 
        playerTurn};
};

const player1 = player();
const player2 = player();


// probably need variables for each player to store turn locations?
