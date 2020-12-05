function Main() {
    /* /////////////////////////
        GLOBAL VARIABLES
    ////////////////////////// */

    // Sets up the basic variables to utilize the canvas
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    // Sets up the variables to store the intervals in
    var gameInterval;
    var timeInterval;
    var seconds = 0;

    // Sets up the player's conditions (lose and win)
    var faint = false;
    var win = false;
    var playerAtGoal = true;

    // Position limits and velocities for the orb hazards
    var orbYPosMax = 80;
    var orbYPosMin = 40;
    var orbVy = 4;
    var deltaV = 1; // This will only be changed from 1 to -1, or -1 to 1

    // Position limits and velocity for the rain hazard
    var rainYPosMax = 56;
    var rainVy = 1;

    /* /////////////////////////
        SETTING UP OBJECTS
    ////////////////////////// */

    // For all of the dark grey, non-hazardous platforms
    var neutral = [
        {x: 24, y: 264, w: 48, h: 16},
        {x: 24, y: 64, w: 104, h: 16},
        {x: 80, y: 128, w: 16, h: 96},
        {x: 136, y: 216, w: 32, h: 16},
        {x: 208, y: 48, w: 16, h: 48},
        {x: 224, y: 80, w: 16, h: 16},
        {x: 288, y: 136, w: 40, h: 16},
        {x: 392, y: 40, w: 24, h: 16},
        {x: 392, y: 80, w: 16, h: 32},
        {x: 448, y: 72, w: 40, h: 16},
        {x: 600, y: 32, w: 16, h: 32},
        {x: 432, y: 160, w: 48, h: 16},
        {x: 576, y: 240, w: 40, h: 16}
    ]

    // For all of the red hazards that do not move
    var hazardStatic = [
        {x: 224, y: 48, w: 8, h: 24},
        {x: 448, y: 64, w: 16, h: 8},
        {x: 456, y: 88, w: 16, h: 8},
        {x: 136, y: 40, w: 64, h: 32},
        {x: 512, y: 88, w: 64, h: 32},
        {x: 432, y: 152, w: 16, h: 8}
    ]

    // For the small square hazards at the bottom center of the level
    // baseX and baseY refer to their original position on the level
    // x and y refer to their repeatedly updating position
    var hazardOrb = [
        {baseX: 184, baseY: 224, x: 184, y: 224, w: 16, h: 16},
        {baseX: 208, baseY: 256, x: 208, y: 256, w: 16, h: 16},
        {baseX: 224, baseY: 192, x: 224, y: 192, w: 16, h: 16},
        {baseX: 248, baseY: 256, x: 248, y: 256, w: 16, h: 16},
        {baseX: 264, baseY: 168, x: 264, y: 168, w: 16, h: 16},
        {baseX: 288, baseY: 296, x: 288, y: 296, w: 16, h: 16},
        {baseX: 312, baseY: 232, x: 312, y: 232, w: 16, h: 16},
        {baseX: 344, baseY: 240, x: 344, y: 240, w: 16, h: 16},
        {baseX: 368, baseY: 216, x: 368, y: 216, w: 16, h: 16},
        {baseX: 408, baseY: 264, x: 408, y: 264, w: 16, h: 16},
        {baseX: 424, baseY: 296, x: 424, y: 296, w: 16, h: 16},
        {baseX: 440, baseY: 272, x: 440, y: 272, w: 16, h: 16},
        {baseX: 456, baseY: 288, x: 456, y: 288, w: 16, h: 16},
        {baseX: 472, baseY: 256, x: 472, y: 240, w: 16, h: 16}
    ]

    // For the small rectangular hazards that float downwards from the static hazards
    // baseX and baseY refer to their original position on the level
    // x and y refer to their repeatedly updating position
    var hazardRain = [
        {baseX: 528, baseY: 104, x: 528, y: 104, w: 8, h: 16},
        {baseX: 544, baseY: 104, x: 544, y: 104, w: 8, h: 16},
        {baseX: 560, baseY: 104, x: 560, y: 104, w: 8, h: 16},
        {baseX: 144, baseY: 56, x: 144, y: 56, w: 8, h: 16},
        {baseX: 160, baseY: 56, x: 160, y: 56, w: 8, h: 16},
        {baseX: 176, baseY: 56, x: 176, y: 56, w: 8, h: 16}
    ]

    // For the location that the player can obtain their victory
    var goodPlats = [{x: 528, y: 280, w: 48, h: 16}]

    // For the blue, rectangular player
    // goalX and goalY refer to the location that the player has chosen to latch their grappling hook upon
    // Vx and Vy refer to the player's velocity, which is later determined by the player's grappling hook position
    // prevX and prevY cache the player's starting position when they latch on to a platform with their hook
    //      This is to ensure that their speed value is kept constant and cannot change over time
    var player = { x: 40, y: 240, w: 16, h: 24, Vx: 1, Vy: 1, goalX: 0, goalY: 0, prevX: 0, prevY: 0};

    /* /////////////////////////
        DRAW THE OBJECTS
    /////////////////////////// */
    function DrawObjects() {
        // Clears the board and sets the game background
        ctx.clearRect(0, 0, 640, 320);
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 640, 320);

        // Draws all of the platforms
        neutral.forEach(i => {
            ctx.fillStyle = '#767686';
            ctx.fillRect(i.x, i.y, i.w, i.h);
        });
        goodPlats.forEach(i => {
            ctx.fillStyle = '#99c9ca';
            ctx.fillRect(i.x, i.y, i.w, i.h);
        });

        // Draws all of the hazards
        hazardStatic.forEach(i => {
            ctx.fillStyle = '#bb6d6d';
            ctx.fillRect(i.x, i.y, i.w, i.h);
        });
        hazardOrb.forEach(i => {
            ctx.fillStyle = '#bb6d6d';
            ctx.fillRect(i.x, i.y, i.w, i.w);
        });
        hazardRain.forEach(i => {
            ctx.fillStyle = '#bb6d6d';
            ctx.fillRect(i.x, i.y, i.w, i.h);
        });

        // Draws the player's grappling hook only when in motion
        if (playerAtGoal == false) {
            ctx.lineWidth = 4;
            ctx.strokeStyle = '#7c4c77';
            ctx.beginPath();
            ctx.moveTo(player.x + player.w/2, player.y + player.h/2);
            ctx.lineTo(player.goalX, player.goalY);
            ctx.stroke();
            ctx.closePath();
        }

        // Draws the player itself
        ctx.fillStyle = '#8286ff';
        ctx.fillRect(player.x, player.y, player.w, player.h);

    } DrawObjects();

    /* /////////////////////////
        CHANGE OBJ. POSITION
    ////////////////////////// */
    function ChangePos(){
        // Changes the position of the floating rain
        // When the rain reaches its maximum position downwards, its position is reset back to inside of the hazard static block
        hazardRain.forEach(i => {
            if ( i.y == i.baseY + rainYPosMax ) {
                i.y = i.baseY;
            } i.y += rainVy;
        });

        // Changes the position of the floating orbs
        // The orb velocity is randomly determined up to a velocity of 8, making them erratic and inconsistent
        // When the orb reaches its maximum or minimum position, its direction is changed
        hazardOrb.forEach(i => {
            orbVy = Math.round(Math.random() * 8);
            if (i.y < i.baseY - orbYPosMax  ) {
                i.y = i.y + 8;
                deltaV = -1;
            } if (i.y > 320 - 16 || i.y > i.baseY + orbYPosMin) {
                i.y = i.y - 8;
                deltaV = 1;
            } i.y -= orbVy * deltaV;
        });

        // When the player's goal has not been reset by the collision tester . . .
        // Alters the position of the player to match their hook's location
        if (playerAtGoal == false){
            // Obtains the difference between the player's present location and the location of their hook
            var distX = Math.abs(player.goalX - player.prevX);
            var distY = Math.abs(player.goalY - player.prevY);

            var alteredVx = distX/distY
            var alteredVy = distY/distX;

            // This ensures that the velocity function doesn't break due to dividing by zero
            if (distY == 0){ alteredVx = 1; }
            if (distX == 0){ alteredVy = 1; }

            // Changes the player's velocity direction depending where their present location is in relation to their hook's position
            if (player.x <= player.goalX){       // if player to left of goal . . .
                player.Vx = alteredVx;
            } if (player.x >= player.goalX){    // if player to right of goal . . .
                player.Vx = -alteredVx;
            } if (player.y <= player.goalY){     // if player physically above goal . . .
                player.Vy = alteredVy;
            } if (player.y >= player.goalY){     // if player physically beneath goal . . .
                player.Vy = -alteredVy;
            }

            // Updates the velocity of the player
            player.x += player.Vx;
            player.y += player.Vy;
        }
    }

    /* /////////////////////////
        COLLISION TESTS
    ////////////////////////// */
    function PlayerCollision(){
        var hazardStaticCollides = false;
        var hazardOrbCollides = false;
        var hazardRainCollides = false;
        var goodCollides = false;

        // Determines if the player has reached their goal platform
        if (playerAtGoal == false){
            playerAtGoal = PlayerHookTester(playerAtGoal);
        }

        hazardStaticCollides = CollisionTester(hazardStatic);
        hazardOrbCollides = CollisionTester(hazardOrb);
        hazardRainCollides = CollisionTester(hazardRain);
        goodCollides = CollisionTester(goodPlats);

        // If the player has reached a neutral platform, their hook to it is removed
        if (hazardStaticCollides == true || hazardOrbCollides == true || hazardRainCollides == true) {
            faint = true; // If the player has collided with a hazard, the game will end with a loss
        } if (goodCollides == true) {
            win = true; // If the player has reached the victory platform, the game will end with a victory
        } 
    }

    function PlayerHookTester(goalMet){
        for (let i = 0; i < neutral.length; i++) {
            hookCollidesX = false;
            hookCollidesY = false;
            playerCollidesX = false;
            playerCollidesY = false;

            if (player.goalX >= neutral.x && player.goalX <= (neutral.x + neutral.w)){
                hookCollidesX = true;
            } if (player.goalY >= neutral.y && player.goalY <= (neutral.y + neutral.h)){
                hookCollidesY = true;
            } if (hookCollidesX == true && hookCollidesY == true){  // If the player's hook does indeed latch on to a platform, then check if the player is on that platform
                if (player.x > neutral.x && player.x < (neutral.x + neutral.w)){
                    playerCollidesX = true;
                } if ((player.x + player.w) > neutral.x && (player.x + player.w) < (neutral.x + neutral.w)){
                    playerCollidesX = true;
                } if (player.y > neutral.y && player.y < (neutral.y + neutral.h)){
                    playerCollidesY = true;
                } if ((player.y + player.h) > neutral.y && (player.y + player.h) < (neutral.y + neutral.h)){
                    playerCollidesY = true;
                } if (playerCollidesX == true && playerCollidesY == true){
                    goalMet = true; // Whenever the player collides in both the x-direction and the y-direction, this will be returned as true
                }
            }
        } return goalMet;
    }

    function CollisionTester(objects){
        var collidesX;
        var collidesY;
        var collidesObj;

        // Checks each object from the arrays at the start of the script for their relation to the player's position
        objects.forEach(i => {
            collidesX = false; // If the player collides in the x-direction, this will be set to true
            collidesY = false; // If the player collides in the y-direction, this will be set to true
            if (player.x > i.x && player.x < (i.x + i.w)){
                collidesX = true;
            } if ((player.x + player.w) > i.x && (player.x + player.w) < (i.x + i.w)){
                collidesX = true;
            } if (player.y > i.y && player.y < (i.y + i.h)){
                collidesY = true;
            } if ((player.y + player.h) > i.y && (player.y + player.h) < (i.y + i.h)){
                collidesY = true;
            } if (collidesX == true && collidesY == true){
                collidesObj = true; // Whenever the player collides in both the x-direction and the y-direction, this will be returned as true
            }
        }); return collidesObj; // The outcome of what the return value depends on which object array was input in the function
    }

    /* /////////////////////////
        HOOK POSITIONING
    ////////////////////////// */

    // Determines the position of the player's hook based on the x and y coordinates of their mouse click
    // The function will only be called when the player has clicked their mouse on the screen
    function UpdateHookPosition(e) {
        var hookX = e.offsetX;
        var hookY = e.offsetY;
        var hookConnects = false;

        // Ensures that the player cannot accidentally click outside of the canvas board
        // There are a few exceptions to this, but this is rare
        if (hookX > 640 || hookY > 320){
        } else { 
            hookConnects = HookLocator(neutral, hookX, hookY);
            hookWins = HookLocator(goodPlats, hookX, hookY);
        } if (hookConnects == true || hookWins == true) {
            player.goalX = hookX; // If the player has clicked on a neutral platform or the victory platform, then . . .
            player.goalY = hookY; // Their hook position is set to wherever they may have clicked
            player.prevX = player.x; // Stores the player's x and y coordinates
            player.prevY = player.y;
            playerAtGoal = false; // Initializes the player and hook collision testing
        }
    }

    // Sets the player's hook position (goalX, goalY) based on if the player's mouse click collided with an object
    function HookLocator(objects, objX, objY){
        var collidesX;
        var collidesY;
        var collidesObj;

        // The function below works identically to CollisionTester()
        objects.forEach(i => {
            collidesX = false;
            collidesY = false;
            if (objX >= i.x && objX <= (i.x + i.w)){
                collidesX = true;
            } if (objY >= i.y && objY <= (i.y + i.h)){
                collidesY = true;
            } if (collidesX == true && collidesY == true){
                collidesObj = true;
            }
        }); return collidesObj;
    }

    /* /////////////////////////
        START THE GAME
    ////////////////////////// */

    // Loops the game processes based on an interval below that occurs every 60 frames
    function GameLoop(){
        ChangePos(); // Changes the position of the objects and the player on the screen
        DrawObjects(); // Draws the updated position of the objects
        PlayerCollision(); // Checks to see if the player has ever collided with an object
        
        // If the player has lost, then the intervals will be cleared and the page will be reset
        if (faint == true) {
            clearInterval(gameInterval);
            clearInterval(timeInterval);
            window.alert('Player has lost the game!');
            location.reload(); // The page will not be reloaded until the player has accepted their loss
        }

        // If the player has win, then the intervals will be cleared and the page will be reset
        if (win == true) {
            clearInterval(gameInterval);
            clearInterval(timeInterval);
            window.alert('Player has won!');
            location.reload(); // The page will not be reloaded until the player has accepted their victory
        }
    }

    // Sets up the timer for the Gameinfo box beneath the game board box
    // Occurs every 1000ms / 1s
    function DoTimer(){
        seconds += 1;
        var timer = document.getElementById('timer');
        timer.textContent = `${seconds} seconds`;
    }

    document.addEventListener('click', UpdateHookPosition);
    gameInterval = setInterval(GameLoop, 16);
    timeInterval = setInterval(DoTimer, 1000);

    // Allows the player to click the restart text in the Gameinfo box
    // Reloads the page to ensure the game level is correctly reset
    var restart = document.getElementById('restart');
    restart.addEventListener('click', function(){
        location.reload();
    });

} Main();