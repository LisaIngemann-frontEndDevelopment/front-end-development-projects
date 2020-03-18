// Check to see if players have not been chosen, else draw board game
if(localStorage.getItem("player1") === null) {
    var pageContainer = document.querySelector(".page-container");
    pageContainer.style.textAlign = "center";
    pageContainer.innerHTML = `<h1>Game of Thrones Board Game</h1>
                               <p>You have not choosen any players yet. Choose characters to play the game.</p>
                               <a class="choose-char_btn button-secondary" href="index.html">Characters</a>`;
} else {
    // Canvas board game
    // Board variables
    var ctx = null;
    var tileW = 100, tileH = 100;
    var mapW = 10, mapH = 9;
    
    var tileMap = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 2, 1, 3, 1, 2, 1, 0, 0,
        0, 0, 1, 2, 1, 2, 3, 2, 0, 0,
        0, 0, 2, 1, 3, 1, 2, 1, 0, 0,
        0, 0, 1, 2, 1, 2, 1, 2, 0, 0,
        0, 0, 3, 1, 2, 1, 3, 1, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];
    
    // Draw canvas when window has loaded
    window.onload = function() {
        ctx = document.querySelector(".canvas").getContext("2d");
        requestAnimationFrame(drawBoard);
        ctx.font = 'bold 16px "Open Sans", sans-serif';
    };
    
    function drawBoard() {
        if(ctx == null) {
            alert("Your browser does not support HTML canvas. Upgrade it to play the game.");
            return;
        }
    
        // Draw board tiles
        for(var y = 0; y < mapH; y++) {
            for(var x = 0; x < mapW; x++) {
    
                switch(tileMap[((y*mapW)+x)]) {
                    case 1:
                        ctx.fillStyle = "#FFFFFF";
                        break;
                    case 2:
                        ctx.fillStyle = "#5A6C7A";
                        break;  
                    case 3:
                        ctx.fillStyle = "#D3A52F";
                        break;
                    default:
                        ctx.fillStyle = "#FFFFFF";
                }
                ctx.fillRect(x*tileW, y*tileH, tileW, tileH);
            }
        }
    
        // Draw board border
        ctx.beginPath();
        ctx.rect(200, 100, 600, 500);
        ctx.lineWidth = "2";
        ctx.strokeStyle = "#5A6C7A";
        ctx.stroke();
    
        // Draw board separation lines
        ctx.beginPath();
        ctx.moveTo(200, 204);
        ctx.lineTo(700, 204);
    
        ctx.moveTo(300, 304);
        ctx.lineTo(800, 304);
    
        ctx.moveTo(200, 404);
        ctx.lineTo(700, 404);
    
        ctx.moveTo(300, 504);
        ctx.lineTo(800, 504);
    
        ctx.lineWidth = "8";
        ctx.strokeStyle = "#000000";
        ctx.stroke();
    
        // Draw images
        var throneImg = new Image();
        var warningImg = new Image();
    
        throneImg.onload = function (){
            ctx.drawImage(throneImg, 640, 620);
    
            ctx.drawImage(warningImg, 427, 125);
            ctx.drawImage(warningImg, 627, 225);
            ctx.drawImage(warningImg, 427, 325);
            ctx.drawImage(warningImg, 627, 525);
            ctx.drawImage(warningImg, 227, 525);
        }
        throneImg.src = "images/iron_throne_small.png";
        warningImg.src = "images/warning.png";
    
        // Draw text
        ctx.fillStyle = "#000000";
        ctx.fillText("GOAL", 727, 525);
        ctx.fillText("Who can reach the Iron Throne first?", 300, 700);
        ctx.fillText("Watch out for the yellow tiles, danger may be lurking!", 200, 70);
        ctx.fillText("If you roll a 6, you can roll again to avoid them!", 200, 90);
    
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText("START", 223, 120);
    };
    
    // Function to spin dice on click
    (function() {
        var diceContainer = document.querySelector(".dice-container");
        var dice = document.querySelector("#dice");
        var spun = false;
        
        diceContainer.addEventListener("click", function() {
        if(spun) {
            dice.className = "icon-dice";  
        } else {
            dice.className = "icon-dice rotate";
        }
        spun = !spun; // Alternate false and true
        });
    })();
    
    // Function to generate a number from 1-6
    function rollDice() {
        var playerRoll = document.querySelector(".player-roll");
        var roll = Math.floor(Math.random() * 6) + 1;
        playerRoll.innerHTML = "You rolled a " + roll + ".";
    
        return roll;
    };
    
    // Class for each player
    class Player {
        constructor(index, left_offset) {
            this.name = localStorage.getItem("player" + index); // Name of player 1/2
            this.image = document.querySelector(".bead" + index); // Image of player bead1/bead2
            this.currentPosition = 0; // Start at tile/index 0 
            this.left_offset = left_offset; // Separate beads from each other
            this.gambling = false; // Stepped on gambling trap
            this.rollHigh = false; // Stepped on rollHigh trap
            this.lastRoll = 0; // Tracking last roll
    
            if (this.image !== undefined) {
                var firstName = this.name.split(' ', 1)[0]; // Only first name of player to get image
                var playerFN = firstName.toLowerCase();
                this.image.src = "images/" + playerFN + "_small.png";
            };
        };
    };
    
    // Players array
    var players = [
        new Player(1, 0.0),
        new Player(2, 30.0)
    ];
    var currentPlayerIndex = 0; // Start at player 1(0)

    // Left and bottom positions of beads, traps and instructions
    var tiles = [
        {left: 220, bottom: 715},
        {left: 320, bottom: 715},
        {left: 420, bottom: 715, data: {type: "TRAP", move: "BACKWARDS", steps: 1, instruction: "Move back 1 step.", text: "A camp of evil thieves lays ahead of you, they are too many to confront and you decide to walk around them."}},
        {left: 520, bottom: 715},
        {left: 620, bottom: 715},
        {left: 720, bottom: 715},
        {left: 720, bottom: 615},
        {left: 620, bottom: 615, data: {type: "TRAP", move: "FORWARDS", steps: 3, instruction: "Move forwards 3 steps.", text: "A friendly looking dragon is ahead of you and you decide to hitch a ride."}},
        {left: 520, bottom: 615},
        {left: 420, bottom: 615},
        {left: 320, bottom: 615},
        {left: 220, bottom: 615},
        {left: 220, bottom: 515},
        {left: 320, bottom: 515},
        {left: 420, bottom: 515, data: {type: 'TRAP', move: "GAMBLE", instruction: "Next turn: Roll 2, 4 or 6 to move forward or roll 1, 3 and 5 to move backwards.", text: "You are robbed of your travel supplies and continuing the journey may be dangerous. On your next turn you decide to gamble on continuing the journey(roll: 2, 4, 6) or go back to get new supplies(roll: 1, 3, 5)."}},
        {left: 520, bottom: 515},
        {left: 620, bottom: 515},
        {left: 720, bottom: 515},
        {left: 720, bottom: 415},
        {left: 620, bottom: 415},
        {left: 520, bottom: 415},
        {left: 420, bottom: 415},
        {left: 320, bottom: 415},
        {left: 220, bottom: 415},
        {left: 220, bottom: 315, data: {type: 'TRAP', move: "BACKWARDS", steps: 3, instruction: "Move backwards 3 steps.", text: "A group of nightwalkers see you an you have to run!"}},
        {left: 320, bottom: 315},
        {left: 420, bottom: 315},
        {left: 520, bottom: 315},
        {left: 620, bottom: 315, data: {type: 'TRAP', move: "ROLLHIGH" , steps: 1, instruction: "Next turn: Roll a 3 or above to win or move backwards 1 step.", text: "A war is being faught and you have to assist. On your next turn roll higher than 3."}},
        {left: 720, bottom: 315}
    ];
    
    // HTML elements
    var button = document.getElementById("dice");
    var trapContainer = document.querySelector(".message-trap");
    var playerTurnContainer = document.querySelector(".player-turn");
    playerTurnContainer.innerHTML = players[0].name; // Display player1's turn

    // Function to update the bead position based on currentPosition
    function updateBeadPosition() {
        // Use currentPlayerIndex to move the correct bead
        var currentPosition = players[currentPlayerIndex].currentPosition;
        var leftOffset = players[currentPlayerIndex].left_offset;
        var bead = players[currentPlayerIndex].image;
    
        // Set position left and bottom with correct left offset depending on curent player is 1 or 2
        bead.style.left = (tiles[currentPosition].left + leftOffset) + 'px';
        bead.style.bottom = tiles[currentPosition].bottom + 'px';
    };
    
    // Function to move the bead
    function moveBead(amount) {
        // Set current position
        var currentPosition = players[currentPlayerIndex].currentPosition;
        currentPosition += amount;
        if (currentPosition < 0) currentPosition = 0;
        if (currentPosition >= tiles.length) currentPosition = tiles.length - 1; // Go to last tile if currentPosition is higher than the amount of tiles
        players[currentPlayerIndex].currentPosition = currentPosition;
    
        // Move the the bead
        updateBeadPosition();
    
        // If a bead lands on the last tile, win.
        if (currentPosition === tiles.length - 1) {
            localStorage.removeItem("player1");
            localStorage.removeItem("player2");
            localStorage.setItem("winner", players[currentPlayerIndex].name);

            var goalMessage = document.querySelector(".goal-message");
    
            goalMessage.style.display = "block";

            setTimeout(function() { 
                window.location = "finale.html";
            }, 1500);
        };

        return currentPosition;
    };
    
    // Swap player turn
    function swapPlayer() {
        currentPlayerIndex = (currentPlayerIndex == 0) ? 1 : 0; // If player 1(2) is current, set to player 0(1) and vice versa
        playerTurnContainer.innerHTML = players[currentPlayerIndex].name; // Change h2 to display new player's turn
    };
    
    // Event listener on the dice button
    button.addEventListener("click", (e) => {
        var roll = rollDice(); // Roll from 1-6
        players[currentPlayerIndex].lastRoll = roll; // Set lastRoll to number rolled in player class instance
    
        // Traps
        var trapInfo = document.querySelector(".text-trap");
        var trapInstructions = document.querySelector(".instruction");
        var trapH3 = document.querySelector(".message-trap h3");
    
        trapContainer.style.display = "none"; // Set trap to display none
    
        // Set desiredMove to a positive number(roll)
        var desiredMove = roll;
        if (players[currentPlayerIndex].gambling) {
            if ((roll % 2) == 1) {
                desiredMove = -roll; 
            }; // If roll is an odd number move backwards those steps
            players[currentPlayerIndex].gambling = false; // Done gambling, reset to false
        } else if (players[currentPlayerIndex].rollHigh) {
            if (roll < 3) {
                desiredMove = -1;
            }; // If roll is less than 3, move back 1 step
            players[currentPlayerIndex].rollHigh = false; // Done rolling high, reset to false
        };

        // Run moveBead function with amount set to desiredMove
        var currentPosition = moveBead(desiredMove);
    
        if(desiredMove != 6) {
            // If current position does not have a data attribute, hide trap message and swap player
            if(tiles[players[currentPlayerIndex].currentPosition].data == undefined){
                trapContainer.style.display = "none";
                swapPlayer();
    
            // If player lands on trap tile without rolling 6, activate trap message
            } else if(tiles[players[currentPlayerIndex].currentPosition].data.type == "TRAP") {
                // Display trap message and instructions
                trapContainer.style.display = "block";
                trapInfo.innerHTML = tiles[players[currentPlayerIndex].currentPosition].data.text;
                trapInstructions.innerHTML = tiles[players[currentPlayerIndex].currentPosition].data.instruction;
                dice.style.display = "none"; // Hide dice so player have to interact with trap message
                trapH3.innerHTML = "You hit a trap!";
            };   
        } else if (currentPosition !== tiles.length - 1) {
            // If player rolled a 6 and is not on the last tile, display skip trap and roll again message
            dice.style.display = "none";
            trapInfo.innerHTML = "You rolled a 6 and skip any traps and get to roll again.";
            trapInstructions.innerHTML = "Roll again.";
            trapH3.innerHTML = "You Rolled a 6";
            trapContainer.style.display = "block";
        };
    });
    
    var trapOkBtn = document.querySelector(".accept-trap");

    // Event listener to process traps, user has to click ok on trap message.
    trapOkBtn.addEventListener("click", (e) => {
        var currentPosition = players[currentPlayerIndex].currentPosition;
        if (players[currentPlayerIndex].lastRoll !== 6) { // If player did not roll a 6
            var isTrap = tiles[currentPosition] !== undefined && tiles[currentPosition].data !== undefined;
            if (isTrap) { // If player landed on a trap
                if(tiles[currentPosition].data.move == "BACKWARDS") {
                    var backwards = tiles[currentPosition].data.steps;
                    moveBead(-backwards); // If move property is BACKWARDS move back amount equal to steps property
                } else if(tiles[currentPosition].data.move == "FORWARDS") {
                    var forwards = tiles[currentPosition].data.steps;
                    moveBead(forwards) // If move property is FORWARDS move forward amount equal to steps property
                } else if(tiles[currentPosition].data.move == "GAMBLE") {
                    // Set gambling to true for next turn;
                    players[currentPlayerIndex].gambling = true;
                } else if(tiles[currentPosition].data.move == "ROLLHIGH") {
                    // Set rollHigh to true for next turn;
                    players[currentPlayerIndex].rollHigh = true;
                };
            };
            swapPlayer(); // Swap current player
        };
    
        // Hide trap message and display dice
        trapContainer.style.display = "none";
        dice.style.display = "block";
    });
};