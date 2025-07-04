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
                DOMdisplay.showModal("Game Over - Player " + value + " wins!");
                value === "X" ? game.xScore++ : game.oScore++;
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
        DOMdisplay.showModal("Game Over - Draw!");
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
        DOMdisplay.playerTurn();
        return player;
    }

    const getPlayer = () => {
        return player;
    }

    return {
        turn,
        getPlayer
    };
})();

const game = (() => {
    let status = false;
    let xScore = 0;
    let oScore = 0;

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
        xScore,
        oScore,
        getStatus,
        setStatus,
        play
    };
})();

const DOMdisplay = (() => {
    const gameboard = document.getElementById("gameboard");
    const cells = document.getElementsByClassName("gameboard-item");
    const playbtn = document.getElementById("playbtn");
    const gameoverModal = document.getElementById("gameover-modal");
    const gameoverPlaybtn = document.getElementById("gameover-playbtn");
    const gameoverResetbtn = document.getElementById("gameover-resetbtn");
    const resetbtns = [playbtn, gameoverPlaybtn, gameoverResetbtn];
    const playerxScore = document.getElementById("player-x-score");
    const playeroScore = document.getElementById("player-o-score");

    // clear display on reset
    resetbtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            for (let i = 0; i < cells.length; i++) {
                cells[i].textContent = "";
                playbtn.textContent = "Reset";
                playbtn.classList.remove("green");
                if (btn !== gameoverPlaybtn) {
                    game.xScore = 0;
                    game.oScore = 0;
                }
                playerxScore.textContent = "Player X: " + game.xScore;
                playeroScore.textContent = "Player O: " + game.oScore;
            }
            game.play();
        })
    })

    // event listender for whole gameboard
    gameboard.addEventListener("click", (e) => { 
        // separate cell id for coordinates
        let cell = e.target;
        if (cell.classList.contains("watermark")) { // prevent watermark from being clicked
            cell.classList.remove("watermark");
            cell.textContent = "";
        }
        let coordinates = cell.id.split("-"); 
        let x = Number(coordinates[0]);
        let y = Number(coordinates[1]);
        player.turn(x, y, cell);
    })

    // hover affect to show player position before click
    gameboard.addEventListener("mouseover", (e) => {
        let cell = e.target;
        if (game.getStatus() === true && cell.textContent == "") {
            cell.classList.add("watermark");
            cell.textContent = player.getPlayer();
        }
    })

    // remove hover affect when mouse leaves
    gameboard.addEventListener("mouseout", (e) => {
        let cell = e.target;
        if (game.getStatus() === true && cell.classList.contains("watermark")) {
            cell.classList.remove("watermark");
            cell.textContent = "";
        }
    })

    const showModal = (text) => {
        gameoverModal.showModal();
        gameoverModal.querySelector("p").textContent = text;
    }

    const playerTurn = () => {
        document.getElementById("player-turn").textContent = "Turn: " + player.getPlayer();
    }

    return {
        showModal,
        playerTurn
    };

})();
