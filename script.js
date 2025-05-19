const gameboard = (() => {
    let gameboard = []

    // set a 3x3 board w/ loop
    const reset = () => {
        for (let i = 0; i < 3; i++) {
            gameboard[i] = [];
            for (let j = 0; j < 3; j++) {
                gameboard[i][j] = "";
            }
        }
        console.log(gameboard);
    }

    // update board based on user input
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

    // check for win or draw
    const status = (value) => {
        let winStatus = false;

        // all possible tic-tac-toe win combinations
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

        // loop through each win combination
        for (let i = 0; i < winCombos.length; i++) {
            for (let j = 0; j < winCombos[i].length; j++) {
                // if any item in win combo is not player's value skip it
                if (winCombos[i][j] !== value) { 
                    winStatus = false;
                    break;
                // if all items in win combo are player's value
                } else if (winCombos[i][j] === value) { 
                    winStatus = true;
                } 
            }
            // if winStatus is true after any win combo end game
            if (winStatus === true) { 
                game.setStatus(false);
                return console.log("Player " + value + " wins!");
            } 
        }

        // check for draw (no empty spaces left)
        for (let i = 0; i < gameboard.length; i++) {
            for (let j = 0; j < gameboard[i].length; j++) {
                if (gameboard[i][j] === "") {
                    return;
                }
            }
        }
        game.setStatus(false);
        return console.log("Draw!");
    }

    return {
        reset, 
        update, 
        status};
})();

const player = (() => {
    let player = "X";

    // player turn coordinates for gameboard
    const turn = (x, y, cell) => {
        if (game.getStatus() === false) {
            return;
        } 
        tempPosition = gameboard.update(x, y, player);
        // account for spaces taken
        if (tempPosition === false) {
            return;
        }
        cell.textContent = player;
        // switch player
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
        return status
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

const DOM = (() => {
    const gameboard = document.getElementById("gameboard");
    const playbtn = document.getElementById("playbtn");

    playbtn.addEventListener("click", () => {
        game.play();
    })

    // event listender for whole gameboard
    gameboard.addEventListener("click", (e) => { 
        // separate cell id for coordinates
        cell = e.target;
        let coordinates = cell.id.split("-"); 
        let x = Number(coordinates[0]);
        let y = Number(coordinates[1]);
        player.turn(x, y, cell);
    })

})();

// notes
// the game has never been able to have more than one round, it has always been refreshed
// i need to add in some getters and setters for the gameboard / play state so that the game can be reset