$(function() {
    var player = 'blue';    // Assigns a fresh player variable
    PlayerDisplay(player);
    var win = 0;            // Assign a fresh neutral value for the victory status
    var sqId;               // Initializing variable for use in the event listener
    var $sq;                // Initializing variable for use in the event listener
                            
    $('.square').on('click', function() {       // When a player clicks on a square, call the function . . .
        sqId = this.id;                         // Save the ID of the square that was clicked on
        $sq = $(`#${sqId}`);                    // Save the JQuery ID tag in a variable for easier access later

        if ($sq.attr('class') == 'square') {
            $sq.removeClass('square');          // Remove the default square class from the clicked square
            $sq.addClass(`square-${player}`);   // Add the player's team name as the new square class

            win = RowCheck();                   // Call the function to check for the current victory status

            if (win == 0){                      // If a player has yet to win based on RowCheck(), then . . .
                player = PlayerTeam(player);    // Change the player teams to allow the other player to click a square
            }
            else {                              // If a player has won the game, or the game has ended in a tie, then . . . 
                if (win == 1){                  // a) State the specific player has won. 
                    window.alert(`Player ${player.toUpperCase()} has won the game!`);
                } else {                        // b) State that the game was a tie.
                    window.alert('The game has ended in a tie. Neither player was able to win this round.');
                }

                player, win = ResetAll();
            }
        }
    });

    function RowCheck() {
        var win = 0;    // Ensures that the current win status is initialized and set to a default value = "0" / no win
        var sq0 = $('#sq0').attr('class');
        var sq1 = $('#sq1').attr('class');
        var sq2 = $('#sq2').attr('class');
        var sq3 = $('#sq3').attr('class');  // -----------
        var sq4 = $('#sq4').attr('class');  // sq0 sq1 sq2
        var sq5 = $('#sq5').attr('class');  // sq3 sq4 sq5
        var sq6 = $('#sq6').attr('class');  // sq6 sq7 sq8
        var sq7 = $('#sq7').attr('class');  // -----------
        var sq8 = $('#sq8').attr('class');

        if (sq0 !== 'square'){
            if (sq0 == sq1 && sq1 == sq2) { win = 1; }  // Row 1
            if (sq0 == sq3 && sq3 == sq6) { win = 1; }  // Column 1
            if (sq0 == sq4 && sq4 == sq8) { win = 1; }  // Diagonal, top-left to bottom-right
        } if (sq4 !== 'square'){
            if (sq4 == sq5 && sq5 == sq3) { win = 1; }  // Row 2
            if (sq4 == sq7 && sq7 == sq1) { win = 1; }  // Column 2
            if (sq4 == sq6 && sq6 == sq2) { win = 1; }  // Diagonal, bottom-left to top-right
        } if (sq8 !== 'square'){
            if (sq8 == sq7 && sq7 == sq6) { win = 1; }  // Row 3
            if (sq8 == sq5 && sq5 == sq2) { win = 1; }  // Column 3
        } 
        if (sq0 !== 'square' && sq1 !== 'square' && sq2 !== 'square' && sq3 !== 'square' && sq4 !== 'square' && sq5 !== 'square' && sq6 !== 'square' && sq7 !== 'square' && sq8 !== 'square') { 
            if ( win !== 1) {   // If all of the squares have been claimed, and win doesn't already equal 1 (or a victory)
                win = 2         // Then set win to 2 (or a tie)
            }
        }
        
        return win;   // Return the win status back to the event listener
    }
    
    function PlayerTeam(player) {
        var newPlayer;  // Set a new variable to be returned

        switch (player) {
            case 'red':                 // If prior round was RED's turn . . .
                newPlayer = 'blue';     // Set the new player to "blue"
                break;
            case 'blue':                // If prior round was BLUE's turn . . .
                newPlayer = 'red';      // Set the new player to "red"
                break;
        }
        PlayerDisplay(newPlayer);
        return newPlayer;   // Return player for the upcoming round to event listener
    }

    function ResetAll() {
        var player, win;
        for (let i = 0; i < 9; i++) {   // Refresh all of the squares' classes to 'square'
            $(`#sq${i}`).attr('class', 'square'); 
        }    
        player = 'blue';                // Reset the player team back to the default (blue)
        win = 0;                        // Reset the current win status back to default (neutral / 0)
        return (player, win);
    }

    function PlayerDisplay(player) {
        var plyTeam = player.toUpperCase();
        $('#team').text(plyTeam);
        $('#team').removeAttr('class');
        $('#team').removeClass();
        $('#team').addClass(`team-${player}`);
    }
});
