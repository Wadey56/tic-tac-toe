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
            console.log("Space already taken");
            return false;
        } else {
            gameboard[x][y] = value;
            console.log(gameboard);
            status(value);
        }
    }

    const status = (value) => {
        let winStatus = false;

        winCombos = [
            [gameboard[0][0], gameboard[0][1], gameboard[0][2]],
            [gameboard[1][0], gameboard[1][1], gameboard[1][2]],
            [gameboard[2][0], gameboard[2][1], gameboard[2][2]],
            [gameboard[0][0], gameboard[1][0], gameboard[2][0]],
            [gameboard[0][1], gameboard[1][1], gameboard[2][1]],
            [gameboard[0][2], gameboard[1][2], gameboard[2][2]],
            [gameboard[0][0], gameboard[1][1], gameboard[2][2]],
            [gameboard[0][2], gameboard[1][1], gameboard[2][0]]
        ]

        for (let i = 0; i < winCombos.length; i++) {
            for (let j = 0; j < winCombos[i].length; j++) {
                if (winCombos[i][j] === "") {
                    winStatus = false;
                    break;
                } else if (winCombos[i][j] === value) {
                    winStatus = true;
                } else {
                    winStatus = false;
                    break;
                }
            }
            if (winStatus === true) {
                game.status = false;
                return console.log("Player " + value + " wins!");
            } 
        }

        for (let i = 0; i < gameboard.length; i++) {
            for (let j = 0; j < gameboard[i].length; j++) {
                if (gameboard[i][j] === "") {
                    return;
                }
            }
        }
        game.status = false;
        return console.log("Draw!");
    }

    return {
        reset, 
        update, 
        status};
})();

const player = (() => {
    let player = "X";

    const turn = (x, y) => {
        if (game.status === false) {
            return;
        } 
        tempPosition = gameboard.update(x, y, player);
        if (tempPosition === false) {
            return;
        }
        player = player === "X" ? "O" : "X";
        return player;
    }

    return {
        turn
    };
})();

const game = (() => {
    let status = false;

    const getStatus = () => {
        return status;
    }

    const setStatus = (value) => { // this is needed as status is ref'd outside of game
        status = value;
    }

    const play = () => {
        gameboard.reset();
        setStatus(true);
        return status;
    }

    return {
        getStatus,
        setStatus,
        play
    };
})();